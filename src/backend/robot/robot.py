from flask import Blueprint, request, current_app
from flask_socketio import emit, send
from extensions import socketio, db
from models.log_sistema import LogSistema
# from main import socketio

robotFlask = Blueprint('robot', __name__, url_prefix='/robot')

@socketio.on('connect')
def handle_connect():
    print(request.sid)
    print("client has connected")
    emit("connectResponse", {"data": f"id: {request.sid} is connected"})


@socketio.on('disconnect')
def handle_disconnect():
    print("client has disconnected")
    emit("disconnectResponse", {"data": f"id: {request.sid} is disconnected"})

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
    
    
