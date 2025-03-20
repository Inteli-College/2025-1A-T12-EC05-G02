# extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO

db = SQLAlchemy()
socketio = SocketIO(cors_allowed_origins="*")

# pm2 start main.py --interpreter python3 --name "pharmabot-backend"