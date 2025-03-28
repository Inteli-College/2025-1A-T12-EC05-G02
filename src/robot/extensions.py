import socketio

# Cria uma instância do cliente Socket.IO
sio = socketio.Client()
# sio.connect('http://0.0.0.0:5555') # Conecta ao servidor Socket.IO
sio.connect('https://bf7a-204-199-57-14.ngrok-free.app') # Conecta ao servidor Socket.IO