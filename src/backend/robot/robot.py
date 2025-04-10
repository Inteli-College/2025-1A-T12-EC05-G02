from flask import Blueprint, request
from flask_socketio import emit
from extensions import socketio, db
from models.log_sistema import LogSistema
from models.pedido import Pedido
from models.pedido_medicamento import PedidoMedicamento
import time
from flask_jwt_extended import jwt_required

robotFlask = Blueprint('robot', __name__, url_prefix='/robot')

global robot_sid, front_sid, x, y, z, robot_pause

# Initialize global variables
robot_sid = None
front_sid = None
robot_pause = False
x = 0
y = 0
z = 0

@socketio.on('connect')
def handle_connect():
    print(request.sid)
    print("client has connected")
    emit("connectResponse", {"data": f"id: {request.sid} is connected"})


@socketio.on('disconnect')
def handle_disconnect():
    global robot_sid, front_sid  # Ensure global variables are used
    print("client has disconnected")
    if robot_sid == request.sid:
        robot_sid = None
        x = 0
        y = 0
        z = 0
        emit("robotStatusFront", {"status": "Desconectado", "x": x, "y": y, "z": z}, broadcast=True, include_self=True)
    if front_sid == request.sid:
        front_sid = None
    emit("disconnectResponse", {"data": f"id: {request.sid} is disconnected"}, broadcast=True, include_self=True)
    
@socketio.on('connectResponse')
def handle_connect_response(data):
    print("connectResponse: ", str(data))
    global robot_sid, front_sid  # Ensure global variables are used
    if data['data'] == 'Robo conectado ao servidor':
        robot_sid = request.sid  # Save the robot's SID
        print(request.sid)
        print("Robo conectado ao servidor")
        get_queue_medicine()
        
    if data['data'] == 'Front conectado ao servidor':
        front_sid = request.sid
        checkStatusRobot()
        
@socketio.on('disconnectResponse')
def handle_disconnect_response(data):
    print("disconnectResponse: ", str(data)) 

@socketio.on('medicine')
def handle_medicine(data):
    print("medicine: ", str(data))
    
@socketio.on('stopRobot')
def handle_stop_robot(data):
    global robot_sid, x, y, z, robot_pause
    robot_pause = not robot_pause  # Toggle the pause state
    emit("stopRobotCall", data, broadcast=True, include_self=True)
    emit("robotStatusFront", {"status": "Pausado" if robot_pause else "Conectado", "x": x, "y": y, "z": z}, broadcast=True, include_self=True)

    if not robot_pause:
        print("Robot resumed. Checking medicine queue.")
        get_queue_medicine()  # Resume processing the medicine queue
    else:
        print("Robot paused. Medicine queue processing stopped.")
    
@socketio.on('stopRobotResponse')
def handle_stop_robot(data):
    print("stopRobot: ", str(data))
    global robot_sid, x, y, z, robot_pause
    try:
        # Check if the robot was processing a medicine
        pedido = db.session.query(Pedido).filter_by(status='Separando').first()
        if pedido:
            # Update the status to 'Pendente'
            pedido.status = 'Pendente'
            db.session.commit()
            print(f"Pedido {pedido.id} status updated to 'Pendente'")
    except Exception as e:
        db.session.rollback()
        print(f"Error updating pedido status: {e}")

    # Emit the robot status
    checkStatusRobot()
    
@socketio.on('medicineResponse')
def handle_medicine_response(data):
    print("medicineResponse: ", str(data))
    
    emit("medicineFrontResponse", data, broadcast=True, include_self=True)
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
    
@socketio.on('medicineQueue')
def handle_medicine_queue(data):
    print("medicineReload: ", str(data))
   
    
@socketio.on('robotStatus')
def handle_robot_status(data):
    global robot_sid, x, y, z
    print("robotStatus: ", str(data))
    x = data.get('x', 0)
    y = data.get('y', 0)
    z = data.get('z', 0)
    checkStatusRobot()
    
def get_queue_medicine():
    global robot_pause  # Use the global variable to check the pause state
    if robot_pause:
        print("Robot is paused. Skipping medicine queue processing.")
        return  # Do not proceed if the robot is paused

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

def checkStatusRobot():
    global robot_sid, robot_pause
    if robot_pause:
        status = 'Pausado'
        emit("robotStatusFront", {"status": status, "x": x, "y": y, "z": z}, broadcast=True, include_self=True)
        return
    
    if robot_sid:
        status = 'Conectado'
    else:
        status = 'Desconectado'
    emit("robotStatusFront", {"status": status, "x": x, "y": y, "z": z}, broadcast=True, include_self=True)
 
# Rota para puxar as coordenadas do robô para a página de compartimentos
@robotFlask.route('/getRobotCoordinates', methods=["GET"])
@jwt_required()
def get_robot_coordinates():
	global x, y, z  # Usar variáveis globais
	return {"x": x, "y": y, "z": z}  # Retorna as coordenadas do robô
