from models.database import db

class ConfiguracoesBins(db.Model):
    __tablename__ = 'configuracoes_bins'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    configuracao_robo_id = db.Column(db.Integer, db.ForeignKey('configuracoes_robo.id'))
    bin_id = db.Column(db.Text, nullable=False)
    coordenada = db.Column(db.Text, nullable=False)