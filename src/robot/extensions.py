import socketio

# Cria uma instância do cliente Socket.IO
sio = socketio.Client()
sio.connect('http://10.32.0.8:6001') # Conecta ao servidor Socket.IO