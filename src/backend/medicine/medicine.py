from flask import Blueprint, request, current_app
from models.log_sistema import LogSistema
from models.pedido import Pedido
from models.pedido_medicamento import PedidoMedicamento
from extensions import db
from flask_socketio import emit


medicineFlask = Blueprint('medicine', __name__, url_prefix='/medicine')

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