from main import db

class PedidoMedicamento(db.Model):
    __tablename__ = 'pedidos_medicamentos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedidos.id'))
    medicamento_id = db.Column(db.Integer, db.ForeignKey('medicamentos.id'))
    quantidade = db.Column(db.Integer, nullable=False)