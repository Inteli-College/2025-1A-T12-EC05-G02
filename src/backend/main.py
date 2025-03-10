from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from user.user import usersFlask
from robot.robot import robotFlask
from dotenv import load_dotenv

# python3 -m flask --app main run

load_dotenv()
app = Flask(__name__)
SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

db = SQLAlchemy()
db.init_app(app)

import models

app.register_blueprint(usersFlask)
app.register_blueprint(robotFlask)

with app.app_context():
    db.create_all()