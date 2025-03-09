from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from user.user import usersFlask
from robot.robot import robotFlask

# python3 -m flask --app main run

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres.mrlralmljljhiynqbshr:w0WwQGgXW99zaGxh@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

db = SQLAlchemy()
db.init_app(app)

import models

app.register_blueprint(usersFlask)
app.register_blueprint(robotFlask)

with app.app_context():
    db.create_all()