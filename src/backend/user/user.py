
# Importando as bibliotecas necessárias
import bcrypt
from sqlalchemy.exc import IntegrityError
from models.usuario import Usuario
from models.log_sistema import LogSistema
from sqlalchemy.orm import joinedload
from datetime import datetime
from extensions import db
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, unset_jwt_cookies
from decorators.route_auth import role_required
from sqlalchemy import desc


# Definindo o Blueprint
usersFlask = Blueprint('user', __name__, url_prefix='/user')

# Função auxiliar para registrar logs
def registrar_log(acao, detalhes):
    session = db.session
    try:
        # Obtendo o último ID registrado e incrementando para o próximo log
        ultimo_log = session.query(LogSistema).order_by(LogSistema.id.desc()).first()
        # Se não houver logs, o próximo ID será 1
        proximo_id = (ultimo_log.id + 1) if ultimo_log else 1
        # Criando o log
        log = LogSistema(id=proximo_id, acao=acao, detalhes=detalhes, data_hora=datetime.now())
        session.add(log)
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Erro ao registrar log: {e}")
    finally:
        session.close()

# Rota para cadastrar um novo usuário
@usersFlask.route('/signup', methods=["POST"])
def admin_sign():
    user_data = request.get_json()
    name = user_data.get("nome")
    email = user_data.get("email")
    password = user_data.get("senha")
    role = user_data.get("role")
    if (name is None) or (email is None) or (password is None) or (role is None):
        return {"ERRO": "Nomes dos campos incorretos!"}, 422
    
    if (name == "") or (email == "") or (password == "") or (role == ""):
        return {"ERRO": "Campos não podem ser vazios!"}, 422

    if "@" not in email or "." not in email.split("@")[-1]:
        return {"ERRO": "Formato de e-mail inválido!"}, 422

    session = db.session
    try:
        if session.query(Usuario).filter_by(email=email).first():
            return {"ERRO": "E-mail já cadastrado!"}, 401

        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        new_user = Usuario(nome=name, email=email, senha=hashed_password, role=role)
        session.add(new_user)
        session.commit()
        registrar_log("Cadastro de Usuário", f"Usuário {name} cadastrado com sucesso.")
    except IntegrityError:
        session.rollback()
        return {"ERRO": "Erro ao cadastrar usuário!"}, 500
    finally:
        session.close()

    return {"Mensagem": f"Usuário {name} cadastrado com sucesso!"}, 201

# Rota para listar todos os usuários cadastrados
@usersFlask.route('/list', methods=["GET"])
def admin_list():
    session = db.session
    try:
        users = session.query(Usuario).all()
        users_list = [ {"id": user.id, "nome": user.nome, "email": user.email, "role": user.role, "datacadastro": user.data_criacao} for user in users ]
        registrar_log("Listagem de Usuários", "Listagem de todos os usuários realizada com sucesso.")
    finally:
        session.close()

    return {"Usuários": users_list}, 200

# Rota para atualizar informações do usuário
@usersFlask.route('/update', methods=["PUT"])
def admin_update():
    user_data = request.get_json()
    email = user_data.get("email")
    new_name = user_data.get("nome")
    new_password = user_data.get("senha")
    new_role = user_data.get("role")

    if email is None:
        return {"ERRO": "Campo e-mail incorreto!"}, 422

    session = db.session
    try:
        user = session.query(Usuario).filter_by(email=email).first()
        if user:
            if new_name:
                user.nome = new_name
            if new_password:
                user.senha = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
            if new_role:
                user.role = new_role
            session.commit()
            registrar_log("Atualização de Usuário", f"Usuário com e-mail {email} atualizado com sucesso.")
        else:
            return {"ERRO": "Usuário não encontrado!"}, 404
    except Exception as e:
        session.rollback()
        return {"ERRO": f"Erro ao atualizar usuário: {e}"}, 500
    finally:
        session.close()

    return {"Mensagem": "Usuário atualizado com sucesso!"}, 200

# Rota para deletar um usuário
@usersFlask.route('/delete', methods=["DELETE"])
def admin_delete():
    user_data = request.get_json()
    email = user_data.get("email")

    if email is None:
        return {"ERRO": "Campo e-mail incorreto!"}, 422

    session = db.session
    try:
        user = session.query(Usuario).filter_by(email=email).first()
        if user:
            session.delete(user)
            session.commit()
            registrar_log("Deleção de Usuário", f"Usuário com e-mail {email} deletado com sucesso.")
        else:
            return {"ERRO": "Usuário não encontrado!"}, 404
    finally:
        session.close()

    return {"Mensagem": "Usuário deletado com sucesso!"}, 200

@usersFlask.route('/logs', methods=["GET"]) 
def admin_logs():
    session = db.session
    try:
        # Obtém o valor do parâmetro 'acao' da consulta (se houver)
        acao_filter = request.args.get('acao', None)
        
        # Base da consulta ordenada pela data_hora do mais novo para o mais antigo
        query = session.query(LogSistema).order_by(desc(LogSistema.data_hora))

        # Se 'acao' for fornecido, filtra os logs por ação
        if acao_filter:
            query = query.filter(LogSistema.acao == acao_filter)
        
        logs = query.all()

        # Converte os logs para o formato desejado
        logs_list = [{"id": log.id, "acao": log.acao, "data_hora": log.data_hora, "detalhes": log.detalhes, "responsavel":log.usuario_id} for log in logs]
        
    finally:
        session.close()

    return {"Logs": logs_list}, 200

serverErrorMessage = {
    'success': False,
    'message': 'Erro ao fazer login',
    'error': 'Internal Server Error'
}

@usersFlask.route('/info', methods=['GET'])
@jwt_required()
@role_required('admin')
def find_user():
    try:
        user_id = get_jwt_identity()
        user = Usuario.query.filter_by(id=user_id).first()
        
        if user:
            response = jsonify({'success': True, 'message': 'Usuário encontrado', 'user': user.nome, 'email': user.email})
            return response, 200
        else:
            response = jsonify({'success': False, 'message': 'Usuário não encontrado', 'error': 'Not Found'})
            return response, 404
    except:
        return jsonify(serverErrorMessage), 500 # Erro interno do servidor

@usersFlask.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        senha = data.get('senha')

        user = Usuario.query.filter_by(email=email).first()
        
        if not user:
            response = jsonify({
                'success': False,
                'message': 'Erro ao fazer login',
                'error': 'Unauthorized'
            })
            return response, 401

        if not bcrypt.checkpw(senha.encode('utf-8'), user.senha.encode('utf-8')):
            response = jsonify({
                'success': False,
                'message': 'Erro ao fazer login: Acesso não autorizado',
                'error': 'Unauthorized'
            })
            return response, 401
        
        additional_claims = {"roles": user.role}
        access_token = create_access_token(identity=user.id, additional_claims=additional_claims)
        
        message = jsonify({
            'success': True,
            'message': 'Login feito com sucesso',
            'user_id': user.id,
            'access_token': access_token
        })
        return message, 200
    except:
        return jsonify(serverErrorMessage), 500 # Erro interno do servidor

@usersFlask.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        response = jsonify({
            'success': True,
            'message': 'Logout feito com sucesso'
        })
        unset_jwt_cookies(response)
        return response, 200
    except:
        return jsonify(serverErrorMessage), 500 # Erro interno do servidor
