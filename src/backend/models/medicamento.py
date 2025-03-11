from extensions import db

class Medicamento(db.Model):
    __tablename__ = 'medicamentos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.Text, nullable=False)
    descricao = db.Column(db.Text)
    fabricante = db.Column(db.Text)
    validade = db.Column(db.Date)
    lote = db.Column(db.Text)
    dose = db.Column(db.Text)
    
    # Relacionamento com estoque e pedidos_medicamentos
    estoque = db.relationship('Estoque', backref='medicamento', lazy=True)
    pedidos_medicamentos = db.relationship('PedidoMedicamento', backref='medicamento', lazy=True)
