from extensions import db

class ConfiguracoesBins(db.Model):
    __tablename__ = 'configuracoes_bins'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    configuracao_robo_id = db.Column(db.Integer, db.ForeignKey('configuracoes_robo.id'))
    coordenada = db.Column(db.Text, nullable=False)

    nome_bin = db.Column(db.Integer, nullable=False, unique = True)
    nome_medicamento = db.Column(db.String(255), nullable=False, unique = True)
    quantidade = db.Column(db.Integer, nullable=False)

