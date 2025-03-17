from flask import Blueprint, request, current_app
from flask_socketio import emit, send
from extensions import socketio, db
from models.log_sistema import LogSistema
from models.pedido import Pedido
from models.pedido_medicamento import PedidoMedicamento
import time
robotFlask = Blueprint('robot', __name__, url_prefix='/robot')

@socketio.on('connect')
def handle_connect():
    print(request.sid)
    print("client has connected")
    emit("connectResponse", {"data": f"id: {request.sid} is connected"})


@socketio.on('disconnect')
def handle_disconnect():
    print("client has disconnected")
    emit("disconnectResponse", {"data": f"id: {request.sid} is disconnected"}, broadcast=True, include_self=True)
    
@socketio.on('connectResponse')
def handle_connect_response(data):
    print("connectResponse: ", str(data))
    if data['data'] == 'Robo conectado ao servidor':
        get_queue_medicine()
    
@socketio.on('disconnectResponse')
def handle_disconnect_response(data):
    print("disconnectResponse: ", str(data)) 

@socketio.on('medicine')
def handle_medicine(data):
    print("medicine: ", str(data))
    
@socketio.on('medicineResponse')
def handle_medicine_response(data):
    print("medicineResponse: ", str(data))
    # atualiza o status do pedido para 'Concluído'
    try:
        pedido = db.session.query(Pedido).filter_by(id=int(data['idFita'])).first()
        pedido.status = data['status']
        db.session.commit()
        if data['status'] == 'Completo':
            get_queue_medicine()
               
    except Exception as e:
        db.session.rollback()
        print(f"Error updating pedido status: {e}")


@socketio.on('log')
def handle_message(data):
    print("log: ", str(data))
    try:
        ultimo_log = db.session.query(LogSistema).order_by(LogSistema.id.desc()).first()
        proximo_id = (ultimo_log.id + 1) if ultimo_log else 1
        log = LogSistema(id=proximo_id, acao=data['acao'], detalhes=data['detalhes'], usuario_id=int(data['usuario_id']))
        db.session.add(log)
        db.session.commit()
        print("log added to database")
    except Exception as e:
        db.session.rollback()
        print(f"Error adding log to database: {e}")
    print("log added to database")
    
@robotFlask.route('/medicine/reload', methods=['POST'])
def reload_medicine():
    get_queue_medicine()
    return {
        'message': 'Fila de medicamentos recarregada',
        'code': 200
    }
    
    
def get_queue_medicine():
    # Verifica se tem algum pedido pendente ordenado por data de criação e prioridade crescente
    pedido_pendente = db.session.query(Pedido).filter_by(status='Pendente').order_by(Pedido.data_pedido, Pedido.prioridade).first()
    print(pedido_pendente)
    
    if pedido_pendente:
        fita = {}
        pedido_medicamentos = db.session.query(PedidoMedicamento).filter_by(pedido_id=pedido_pendente.id).all()
        for pedido_medicamento in pedido_medicamentos:
            fita[pedido_medicamento.medicamento_id] = pedido_medicamento.quantidade
        
        time.sleep(1)
        emit("medicine", {"idFita": pedido_pendente.id, "bins": fita}, namespace='/', broadcast=True, include_self=True)
