from flask import Blueprint, request, current_app, jsonify
from models.pedido import Pedido
from models.pedido_medicamento import PedidoMedicamento
from models.medicamento import Medicamento
from flask_socketio import emit
from extensions import socketio, db
from flask_jwt_extended import jwt_required

medicineFlask = Blueprint('medicine', __name__, url_prefix='/medicine')

# Cria uma prescrição médica
@medicineFlask.route('/prescription', methods=['POST'])
@jwt_required()
def create_prescription():
    data = request.json
    
    try:
        pedido = Pedido(
            status='Pendente',
            paciente_id=data['pacienteId'],
            prioridade=data['prioridade'],
            liberado_por=data['liberadoPor'],
        )
        
        fita = {}
        db.session.add(pedido)
        db.session.commit()
        print(pedido.id)
        for medicamento in data['medicamentos']:
            pedido_medicamento = PedidoMedicamento(
                pedido_id=pedido.id,
                medicamento_id=int(medicamento['id']),
                quantidade=medicamento['quantidade']
            )
            fita[medicamento['id']] = medicamento['quantidade']
            db.session.add(pedido_medicamento)
            
        db.session.commit()
        
        queue_list = get_queue_medicine()
        
        # Verifica se algum item na fila está com o status 'Separando'
        if not any(item["status"] == "Separando" for item in queue_list):
            emit("medicine", {"bins": fita, "idFita": pedido.id}, namespace='/', broadcast=True, include_self=True)

        emit("queue", {"queue": queue_list}, namespace='/', broadcast=True, include_self=True)
   
    except Exception as e:
        db.session.rollback()
        return {
            'message': f'Erro ao criar prescrição médica: {e}',
            'code': 500
        }, 500
    
    return {
        'message': 'Prescrição médica criada com sucesso',
        'code': 200
    }

@medicineFlask.route('/logs', methods=['GET'], endpoint='medicine_logs')
@jwt_required()
def get_prescription_logs():
    try:
        orders = db.session.query(Pedido).order_by(Pedido.data_pedido.desc()).all()
        
        result = []

        for order in orders:
            result.append({
            'prescricao': order.id,
            'status': order.status,
            'data_pedido': order.data_pedido,
            'paciente': order.paciente_id,
            'prioridade': order.prioridade,
            'farmaceutico': order.liberado_por
        })
        
        return jsonify({
            'message': 'Logs retornados!',
            'data': result,
            'code': 200
        })
    except Exception as e:
        current_app.logger.error(f"Erro ao obter logs de prescrição: {e}")
        return jsonify({
            'message': 'Erro ao obter logs de prescrição',
            'code': 500
        }), 500
    
# get the full medicine queue
@medicineFlask.route('/queue', methods=['GET'])
@jwt_required()
def get_full_queue_medicine():
    try:
        queue_list = get_queue_medicine()
        
        return {
            'message': 'Fila completa de medicamentos carregada',
            'code': 200,
            'queue': queue_list  # Retorna a lista de fitas
        }, 200
    except Exception as e:
        db.session.rollback()
        return {
            'message': f'Erro ao buscar fila completa de medicamentos: {e}',
            'code': 500
        }, 500
        
def get_queue_medicine():
    # Use join para buscar pedidos e seus medicamentos em uma única consulta
        pending_orders = (
            db.session.query(Pedido, PedidoMedicamento, Medicamento)
            .join(PedidoMedicamento, Pedido.id == PedidoMedicamento.pedido_id)
            .join(Medicamento, PedidoMedicamento.medicamento_id == Medicamento.id)
            .order_by(Pedido.ultima_atualizacao)
            .filter(Pedido.ultima_atualizacao >= db.func.current_date())
            .all()
        )
        
        # Organize os dados em um dicionário para evitar duplicação de pedidos
        queue = {}
        for pedido, pedido_medicamento, medicamento in pending_orders:
            if pedido.id not in queue:
                queue[pedido.id] = {
                    "id": str(pedido.id),
                    "status": pedido.status,
                    "priority": pedido.prioridade,
                    "order": pedido.order if pedido.order else pedido.ultima_atualizacao.isoformat(),
                    "nomePaciente": pedido.paciente.nome if pedido.paciente else "Desconhecido",
                    "leito": pedido.paciente.leito if pedido.paciente and hasattr(pedido.paciente, 'leito') else "Desconhecido",
                    "medicamentos": []
                }
            queue[pedido.id]["medicamentos"].append({
                "nome": medicamento.nome if medicamento else "Desconhecido",
                "quantidade": pedido_medicamento.quantidade
            })

        # Converta o dicionário em uma lista
        queue_list = list(queue.values())
        emit("medicineQueue", {"queue": queue_list}, namespace='/', broadcast=True, include_self=True)

        return queue_list

@socketio.on('updateQueue')
def handle_update_queue(data):
    try:
        fitas = data.get("queue", [])
        fitas = [item for item in fitas if item.get('status') == 'Pendente']
        for item in fitas:
            pedido_id = item.get("id")

            # Busca o pedido pelo ID
            pedido = db.session.query(Pedido).filter_by(id=pedido_id).first()

            if pedido:
                # Atualiza o status do pedido
                pedido.order = item.get("order")
                db.session.add(pedido)

        # Salva as alterações no banco de dados
        db.session.commit()

        # Emite a fila atualizada para todos os clientes conectados
        queue_list = get_queue_medicine()
        emit("queue", {"queue": queue_list}, namespace='/', broadcast=True, include_self=True)

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Erro ao atualizar a fila: {e}")
        emit("error", {"message": f"Erro ao atualizar a fila: {e}"}, namespace='/')


@medicineFlask.route('/statuses', methods=['GET'])
@jwt_required()
def get_statuses_count():
    try:
        completed = db.session.query(Pedido).filter(Pedido.status == 'Completo').count()
        in_queue = db.session.query(Pedido).filter(Pedido.status == 'Pendente').count()

        print('Completed', completed)
        print('Awaiting', in_queue)

        statuses = {
            'completed': completed,
            'in_queue': in_queue
        }
        
        return jsonify({
            'message': 'Status retornados!',
            'data': statuses,
            'code': 200
        })
    except Exception as e:
        current_app.logger.error(f"Erro ao obter status de prescrição: {e}")
        return jsonify({
            'message': 'Erro ao obter status de prescrição',
            'code': 500
        }), 500
    
@medicineFlask.route('/medicamentos', methods=['GET'])
def listar_medicamentos():
    try:
        session = db.session

        # Consulta unindo as tabelas Estoque e Medicamento
        query = session.query(
            Medicamento.id,
            Medicamento.nome,
            Medicamento.descricao,
            Medicamento.fabricante,
            Medicamento.dose,
        )

        # Converte os resultados para uma lista de dicionários
        medicamento_list = [
            {
                "acao": item.nome,
            }
            for item in query.all()
        ]
        
    finally:
        session.close()

    return {"Logs": medicamento_list}, 200

@medicineFlask.route('/criar-medicamento', methods=['POST'])
def criar_medicamento():
    try:
        session = db.session
        
        data = request.get_json()
        
        medicamento = Medicamento(
            nome = data.get("nome"),
            descricao = data.get("descricao"),
            fabricante = data.get("fabricante"),
            validade = data.get("validade"),
            lote = data.get("lote"),
            dose = data.get("dose")
        )
        
        session.add(medicamento)
        session.commit()

    except Exception as error:
        return jsonify({
            "success": "false",
            "message": f"Erro ao criar medicamento: {error}"
        }), 400

    finally:
        session.close()
    
    return jsonify({
        "success": "true",
        "message": "Medicamento criado com sucesso"
    }), 200
