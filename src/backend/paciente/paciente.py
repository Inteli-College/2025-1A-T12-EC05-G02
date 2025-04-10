from flask import Blueprint, request, current_app
from models.paciente import Paciente
from models.pedido_medicamento import PedidoMedicamento
from extensions import db
from flask_socketio import emit
import json

pacienteFlask = Blueprint('paciente', __name__, url_prefix='/paciente')


@pacienteFlask.route('/criar', methods=['POST'])
def create_paciente():
    data = request.json
    
    try:

        paciente = Paciente(
            nome = data['nome'],
            hc = data['hc'],
            leito = data['leito']
        )
        
        db.session.add(paciente)
        db.session.commit()

        return {
            'message': 'Cadastro do paciente criado com sucesso',
            'code': 200
        }
        
    except Exception as e:
        db.session.rollback()
        return {
            'message': f'Erro ao cadastrar paciente : {e}',
            'code': 500
        }, 
    
    

@pacienteFlask.route('/list', methods=["GET"])
def list_paciente():
    session = db.session
    
    try:
        
        pacientes = session.query(Paciente).all()
        paciente_list = [
            {
                'id' : paciente.id,
                'nome': paciente.nome,
                'hc' : paciente.hc,
                'leito' : paciente.leito
            }
            for paciente in pacientes
        ]
        
        return {"Pacientes": paciente_list}, 200

    except Exception as e:
        return {
            'message': f'Erro ao listar pacientes: {e}',
            'code': 500
        }
    
    finally:
        session.close()
        