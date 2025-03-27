from extensions import db

class Estoque(db.Model):
    __tablename__ = 'estoque'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ultima_atualizacao = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    medicamento_id = db.Column(db.Integer, db.ForeignKey('medicamentos.id'))
    quantidade = db.Column(db.Integer, nullable=False)
    bin_localizacao = db.Column(db.Text)