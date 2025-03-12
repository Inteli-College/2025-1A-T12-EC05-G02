from flask import jsonify
from functools import wraps
from flask_jwt_extended import get_jwt

def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims.get("roles") and role in claims["roles"]:
                return fn(*args, **kwargs)
            else:
                return jsonify({"message": "Acesso negado"})
        return decorator
    return wrapper
