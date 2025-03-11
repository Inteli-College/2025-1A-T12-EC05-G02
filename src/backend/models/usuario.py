from models.database import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)
    senha = db.Column(db.Text, nullable=False)
    role = db.Column(db.Text, nullable=False)
    data_criacao = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    
    # Relacionamento com os logs do sistema
    logs = db.relationship('LogSistema', backref='usuario', lazy=True)