from flask import Blueprint, request, current_app
from flask_socketio import emit, send
from extensions import socketio
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

@socketio.on('data')
def handle_message(data):
    print("data from the front end: ", str(data))
    emit("data", {'data': data, 'id': request.sid}, broadcast=True)
    
