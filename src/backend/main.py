from flask import Flask
from user.user import usersFlask
from robot.robot import robotFlask

app = Flask(__name__)

app.register_blueprint(usersFlask)
app.register_blueprint(robotFlask)