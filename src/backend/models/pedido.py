from extensions import db

class Pedido(db.Model):
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Text)
    data_pedido = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    paciente_id = db.Column(db.Integer, db.ForeignKey('pacientes.id'))
    prioridade = db.Column(db.Integer)
    liberado_por = db.Column(db.Text)
    ultima_atualizacao = db.Column(db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())
    
    # Relacionamento com os medicamentos solicitados no pedido
    pedidos_medicamentos = db.relationship('PedidoMedicamento', backref='pedido', lazy=True)
