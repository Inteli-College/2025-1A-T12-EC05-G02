# Importando as bibliotecas necessárias
from flask import Blueprint, jsonify
from extensions import db
from models.estoque import Estoque
from models.medicamento import Medicamento


# Definindo o Blueprint
logsFlask = Blueprint('logs', __name__, url_prefix='/logs')

@logsFlask.route('/estoque', methods=["GET"])
def listar_estoque():
    session = db.session
    try:
        # Consulta unindo as tabelas Estoque e Medicamento
        query = session.query(
            Estoque.id,
            Estoque.medicamento_id,
            Estoque.quantidade,
            Estoque.bin_localizacao,
            Estoque.ultima_atualizacao,
            Medicamento.nome  # Pegando o nome do medicamento correspondente
        ).join(Medicamento, Estoque.medicamento_id == Medicamento.id)

        # Converte os resultados para uma lista de dicionários
        estoque_list = [
            {
                "id": item.id,
                "medicamento_id": item.medicamento_id,
                "nome_medicamento": item.nome,
                "quantidade": item.quantidade,
                "bin_localizacao": item.bin_localizacao,
                "ultima_atualizacao": item.ultima_atualizacao
            }
            for item in query.all()
        ]
        
    finally:
        session.close()

    return {"estoque": estoque_list}, 200