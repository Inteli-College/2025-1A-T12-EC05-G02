from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from models.config_bins import ConfiguracoesBins
from extensions import db
import json

binsFlask = Blueprint('bins', __name__, url_prefix='/bins')

# Cria um bin
@binsFlask.route('/criar', methods=['POST'])
@jwt_required()
def create_bin():
    data = request.json
    
    try:
        
        verifica_bin = ConfiguracoesBins.query.filter(
            (ConfiguracoesBins.nome_bin == data['nomeBin']) |
            (ConfiguracoesBins.nome_medicamento == data['nomeMedicamento'])
        ).first()

        if verifica_bin:
            return {
                'message': 'Já existe um bin ou medicamento com esse nome.',
                'code': 400
            }, 400


        coordenada_json = json.dumps({  # Converte o dicionário para string JSON
            "x": float(data['x']),
            "y": float(data['y']),
            "z": float(data['z'])
        })
        
        bin = ConfiguracoesBins(
            coordenada=coordenada_json,
            nome_bin = data['nomeBin'],
            nome_medicamento = data['nomeMedicamento'],
            quantidade = data['quantidade']
        )
        
        db.session.add(bin)
        db.session.commit()

        return {
            'message': 'Bin criado com sucesso',
            'code': 200
        }
        
    except Exception as e:
        db.session.rollback()
        return {
            'message': f'Erro ao criar  bin : {e}',
            'code': 500
        }, 500
    
    

@binsFlask.route('/list', methods=["GET"])
@jwt_required()
def list_bins():
    session = db.session
    
    try:
        
        bins = session.query(ConfiguracoesBins).all()
        bins_list = [
            {
                'id' : bin.id,
                'nomeBin': bin.nome_bin,
                'nomeMedicamento' : bin.nome_medicamento,
                'quantidade' : bin.quantidade,
                'coordenadas': bin.coordenada
            }
            for bin in bins
        ]
        
        return {"Bin": bins_list}, 200

    except Exception as e:
        return {
            'message': f'Erro ao listar bins: {e}',
            'code': 500
        },
    
    finally:
        session.close()
        
@binsFlask.route('/list/<int:id>', methods=['GET'])
@jwt_required()
def get_bin(id):
    session = db.session
    
    try:
        bin = session.query(ConfiguracoesBins).get(id)
        if not bin:
            return {"message": "Bin não encontrado", "code": 404}, 404

        bin_data = {
            'id': bin.id,
            'nomeBin': bin.nome_bin,
            'nomeMedicamento': bin.nome_medicamento,
            'quantidade': bin.quantidade,
            'coordenadas': json.loads(bin.coordenada)  # Converte de volta para dicionário
        }
        
        return {"Bin": bin_data}, 200

    except Exception as e:
        return {
            'message': f'Erro ao listar bins: {e}',
            'code': 500
        }, 500
    
    finally:
        session.close()
        
@binsFlask.route('/editar/<int:id>', methods=['GET'])
@jwt_required()
def edit_bin(id):
    data = request.json

    try:
        bin = ConfiguracoesBins.query.get(id)
        if not bin:
            return {"message": "Bin não encontrado", "code": 404}, 404

        bin.nome_bin = data.get('nomeBin', bin.nome_bin)
        bin.nome_medicamento = data.get('nomeMedicamento', bin.nome_medicamento)
        bin.quantidade = data.get('quantidade', bin.quantidade)
        bin.coordenada = json.dumps({
            "x": float(data['x']),
            "y": float(data['y']),
            "z": float(data['z'])
        })

        db.session.commit()
        return {"message": "Bin atualizado com sucesso", "code": 200}

    except Exception as e:
        db.session.rollback()
        return {"message": f"Erro ao atualizar bin: {e}", "code": 500}, 500