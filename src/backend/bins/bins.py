from flask import Blueprint, request, current_app
from models.log_sistema import LogSistema
from models.config_bins import ConfiguracoesBins
from models.pedido_medicamento import PedidoMedicamento
from extensions import db
from flask_socketio import emit
import json


binsFlask = Blueprint('bins', __name__, url_prefix='/bins')

# Cria um bin
@binsFlask.route('/criar', methods=['POST'])
def create_bin():
    data = request.json
    
    try:
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
def list_bins():
    session = db.session
    
    try:
        bins = session.query(ConfiguracoesBins).all()
        bins_list = [
            {
                'id': bin.id,
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