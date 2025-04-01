from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from extensions import db
from models.estoque import Estoque
from models.medicamento import Medicamento

# Definindo o Blueprint
estoqueFlask = Blueprint('estoque', __name__, url_prefix='/estoque')

@estoqueFlask.route('/', methods=["GET"])
@jwt_required()
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

@estoqueFlask.route('/criar', methods=["POST"])
@jwt_required()
def criar_estoque():
    session = db.session
    try:
        data = request.json

        # Pegando os dados corretos
        medicamento_id = data.get("medicamento_id")
        quantidade = data.get("quantidade")
        bin_localizacao = data.get("bin_localizacao")

        if not medicamento_id or not quantidade:
            return {"error": "Campos obrigatórios faltando"}, 400

        # Criando o objeto
        novo_item = Estoque(
            medicamento_id=medicamento_id,
            quantidade=quantidade,
            bin_localizacao=bin_localizacao
        )

        session.add(novo_item)
        session.commit()
        return {"message": "Estoque criado com sucesso"}, 201
    
    except Exception as e:
        session.rollback()
        return {"error": str(e)}, 500
    finally:
        session.close()