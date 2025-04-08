import os
import logging
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from user.user import usersFlask
from medicine.medicine import medicineFlask
from robot.robot import robotFlask
from bins.bins import binsFlask
from storage.storage import estoqueFlask
from paciente.paciente import pacienteFlask


load_dotenv()
app = Flask(__name__)

SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
SECRET_KEY = os.getenv('SECRET_KEY')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_TOKEN_LOCATION = ['headers']

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SECRET_KEY'] = SECRET_KEY
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_TOKEN_LOCATION'] = JWT_TOKEN_LOCATION
app.config['JWT_VERIFY_SUB'] = False
app.config['DEBUG'] = True
app.config['LOGGING'] = 'DEBUG'

CORS(app)  # Permite todas as origens (para desenvolvimento)
import extensions as ext
ext.db.init_app(app)
ext.socketio.init_app(app, cors_allowed_origins="*")

jwt = JWTManager(app)

app.register_blueprint(usersFlask)
app.register_blueprint(robotFlask)
app.register_blueprint(medicineFlask)
app.register_blueprint(binsFlask)
app.register_blueprint(estoqueFlask)
app.register_blueprint(pacienteFlask)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Rota de teste
@app.get('/version')
def version():
    return '1.0.4'

with app.app_context():
    ext.db.create_all()
    
if __name__ == '__main__':
    ext.socketio.run(app, debug=True, host='0.0.0.0', port=5555)