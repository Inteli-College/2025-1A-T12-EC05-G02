from flask import Flask
import os
from dotenv import load_dotenv
from models.database import db
# from flask_sqlalchemy import SQLAlchemy
from user.user import usersFlask
from robot.robot import robotFlask

# python3 -m flask --app main run

load_dotenv()
app = Flask(__name__)
SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

# db = SQLAlchemy()
db.init_app(app)

import models

app.register_blueprint(usersFlask)
app.register_blueprint(robotFlask)

with app.app_context():
    db.create_all()