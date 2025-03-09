from main import db

class ConfiguracoesRobo(db.Model):
    __tablename__ = 'configuracoes_robo'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    velocidade_operacao = db.Column(db.Integer)
    status = db.Column(db.Text)
    
    # Relacionamento com as configurações dos bins
    configuracoes_bins = db.relationship('ConfiguracoesBins', backref='configuracoes_robo', lazy=True)
