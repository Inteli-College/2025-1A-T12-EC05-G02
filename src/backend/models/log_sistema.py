from extensions import db

class LogSistema(db.Model):
    __tablename__ = 'logs_sistema'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    acao = db.Column(db.Text, nullable=False)
    data_hora = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    detalhes = db.Column(db.Text)
