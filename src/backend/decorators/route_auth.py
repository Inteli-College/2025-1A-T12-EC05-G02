from flask import jsonify
from functools import wraps
from flask_jwt_extended import get_jwt

def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt()
            
            # Caso o usuário não esteja autenticado
            if not claims:
                return jsonify({
                    "success": False,
                    "message": "Autenticação necessária para acessar a rota.",
                    "error": "unauthorized"
                }), 401
                
            # Caso o usuário esteja autenticado, mas o seu role não é "admin"
            if "roles" not in claims or role not in claims["roles"]:
                return jsonify({
                    "success": False,
                    "message": "Acesso negado: privilégios de administrador necessários.",
                    "error": "forbidden"
                }), 403
            
            # Sucesso :thumbs_up:
            return fn(*args, **kwargs)
        return decorator
    return wrapper
