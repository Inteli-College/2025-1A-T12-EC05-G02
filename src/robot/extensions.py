import socketio

# Cria uma instância do cliente Socket.IO
sio = socketio.Client()
sio.connect('http://localhost:5555') # Conecta ao servidor Socket.IO