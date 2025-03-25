from flask import Blueprint, request, current_app, jsonify
from models.log_sistema import LogSistema
from models.pedido import Pedido
from models.pedido_medicamento import PedidoMedicamento
from extensions import db
from flask_socketio import emit


medicineFlask = Blueprint('medicine', __name__, url_prefix='/medicine')

# Função auxiliar para registrar logs
def registrar_log(acao, detalhes):
    session = db.session
    try:
        # Obtendo o último ID registrado e incrementando para o próximo log
        ultimo_log = session.query(LogSistema).order_by(LogSistema.id.desc()).first()
        # Se não houver logs, o próximo ID será 1
        proximo_id = (ultimo_log.id + 1) if ultimo_log else 1
        # Criando o log
        log = LogSistema(id=proximo_id, acao=acao, detalhes=detalhes, data_hora=datetime.now())
        session.add(log)
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Erro ao registrar log: {e}")
    finally:
        session.close()

# Cria uma prescrição médica
@medicineFlask.route('/prescription', methods=['POST'])
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
        
        emit("medicine", {"bins": fita, "idFita": pedido.id}, namespace='/', broadcast=True, include_self=True)
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

@medicineFlask.route('/logs', methods=['GET'])
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
