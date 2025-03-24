# Importando as bibliotecas necessárias
import bcrypt
from sqlalchemy.exc import IntegrityError
from models.usuario import Usuario
from models.log_sistema import LogSistema
from datetime import datetime
from extensions import db
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, unset_jwt_cookies
from decorators.route_auth import role_required
from sqlalchemy import desc


# Definindo o Blueprint
logsFlask = Blueprint('logs', __name__, url_prefix='/logs')
