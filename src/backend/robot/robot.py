from flask import Blueprint

robotFlask = Blueprint('robot', __name__, url_prefix='/robot')

@robotFlask.route('/exemple',  methods=["GET"])
def exemple():
    return "Exemple"