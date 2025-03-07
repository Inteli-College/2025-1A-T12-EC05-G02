from flask import Blueprint

usersFlask = Blueprint('user', __name__, url_prefix='/user')

@usersFlask.route('/exemple',  methods=["GET"])
def exemple():
    return "Exemple"