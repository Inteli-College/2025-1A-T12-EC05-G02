import socketio
from dotenv import load_dotenv
import os

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Obtém a URL do servidor Socket.IO a partir das variáveis de ambiente
socketio_url = os.getenv('API_URL')

# Cria uma instância do cliente Socket.IO
sio = socketio.Client()
sio.connect(socketio_url) # Conecta ao servidor Socket.IO