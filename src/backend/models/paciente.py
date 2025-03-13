from extensions import db

class Paciente(db.Model):
    __tablename__ = 'pacientes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.Text, nullable=False)
    hc = db.Column(db.Text)
    leito = db.Column(db.Text)
    
    # Um paciente pode ter vários pedidos
    pedidos = db.relationship('Pedido', backref='paciente', lazy=True)