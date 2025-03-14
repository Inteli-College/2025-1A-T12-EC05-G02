from flask import Flask
import os
from user.user import usersFlask
from medicine.medicine import medicineFlask
import robot.robot as robot
from dotenv import load_dotenv
from flask_socketio import SocketIO
import logging

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['DEBUG'] = True
app.config['LOGGING'] = 'DEBUG'


import extensions as ext

ext.db.init_app(app)
ext.socketio.init_app(app, cors_allowed_origins="*")

import models

app.register_blueprint(usersFlask)
app.register_blueprint(robot.robotFlask)
app.register_blueprint(medicineFlask)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

with app.app_context():
    ext.db.create_all()

if __name__ == '__main__':
    ext.socketio.run(app, debug=True, host='0.0.0.0', port=5555)