from flask import Blueprint, request, current_app  # Importar os módulos necessários do Flask para criar blueprints e lidar com requisições
from flask_socketio import emit, send  # Importar funções do socketio para emitir e enviar mensagens
from extensions import socketio, db  # Importar as extensões socketio e banco de dados
from models.log_sistema import LogSistema  # Importar o modelo LogSistema
from models.pedido import Pedido  # Importar o modelo Pedido
from models.pedido_medicamento import PedidoMedicamento  # Importar o modelo PedidoMedicamento
import time  # Importar o módulo time para atrasos

# Criar um blueprint Flask para o módulo do robô
robotFlask = Blueprint('robot', __name__, url_prefix='/robot')

# Declarar variáveis globais
global robot_sid, front_sid, x, y, z, robot_pause

# Inicializar variáveis globais
robot_sid = None  # Armazena o ID de sessão do robô
front_sid = None  # Armazena o ID de sessão do front-end
robot_pause = False  # Indica se o robô está pausado
x = 0  # Coordenada X do robô
y = 0  # Coordenada Y do robô
z = 0  # Coordenada Z do robô

@socketio.on('connect')  # Listener de evento para conexão do cliente
def handle_connect():
    print(request.sid)  # Imprime o ID de sessão do cliente conectado
    print("cliente conectado")  # Loga a conexão
    emit("connectResponse", {"data": f"id: {request.sid} está conectado"})  # Emite uma resposta de conexão para o cliente

@socketio.on('disconnect')  # Listener de evento para desconexão do cliente
def handle_disconnect():
    global robot_sid, front_sid  # Usar variáveis globais
    print("cliente desconectado")  # Loga a desconexão
    if robot_sid == request.sid:  # Verifica se o cliente desconectado é o robô
        robot_sid = None  # Reseta o ID de sessão do robô
        x = 0  # Reseta a coordenada X
        y = 0  # Reseta a coordenada Y
        z = 0  # Reseta a coordenada Z
        # Notifica o front-end sobre a desconexão do robô
        emit("robotStatusFront", {"status": "Desconectado", "x": x, "y": y, "z": z}, broadcast=True, include_self=True)
    if front_sid == request.sid:  # Verifica se o cliente desconectado é o front-end
        front_sid = None  # Reseta o ID de sessão do front-end
    # Emite uma resposta de desconexão
    emit("disconnectResponse", {"data": f"id: {request.sid} está desconectado"}, broadcast=True, include_self=True)

@socketio.on('connectResponse')  # Listener de evento para respostas de conexão
def handle_connect_response(data):
    print("connectResponse: ", str(data))  # Loga os dados da resposta de conexão
    global robot_sid, front_sid  # Usar variáveis globais
    if data['data'] == 'Robo conectado ao servidor':  # Verifica se o robô está conectado
        robot_sid = request.sid  # Salva o ID de sessão do robô
        print(request.sid)  # Loga o ID de sessão
        print("Robo conectado ao servidor")  # Loga a conexão do robô
        get_queue_medicine()  # Processa a fila de medicamentos
    if data['data'] == 'Front conectado ao servidor':  # Verifica se o front-end está conectado
        front_sid = request.sid  # Salva o ID de sessão do front-end
        checkStatusRobot()  # Verifica o status do robô

@socketio.on('disconnectResponse')  # Listener de evento para respostas de desconexão
def handle_disconnect_response(data):
    print("disconnectResponse: ", str(data))  # Loga os dados da resposta de desconexão

@socketio.on('medicine')  # Listener de evento relacionado a medicamentos
def handle_medicine(data):
    print("medicine: ", str(data))  # Loga os dados do medicamento

@socketio.on('stopRobot')  # Listener de evento para parar o robô
def handle_stop_robot(data):
    global robot_sid, x, y, z, robot_pause  # Usar variáveis globais
    robot_pause = not robot_pause  # Alterna o estado de pausa do robô
    emit("stopRobotCall", data, broadcast=True, include_self=True)  # Notifica os clientes sobre o evento de parada
    # Notifica o front-end sobre o status do robô
    emit("robotStatusFront", {"status": "Pausado" if robot_pause else "Conectado", "x": x, "y": y, "z": z}, broadcast=True, include_self=True)
    if not robot_pause:  # Se o robô foi retomado
        print("Robô retomado. Verificando fila de medicamentos.")  # Loga a retomada
        get_queue_medicine()  # Retoma o processamento da fila de medicamentos
    else:
        print("Robô pausado. Processamento da fila de medicamentos interrompido.")  # Loga a pausa

@socketio.on('stopRobotResponse')  # Listener de evento para respostas de parada do robô
def handle_stop_robot(data):
    print("stopRobot: ", str(data))  # Loga os dados de parada do robô
    global robot_sid, x, y, z, robot_pause  # Usar variáveis globais
    try:
        # Verifica se o robô estava processando um medicamento
        pedido = db.session.query(Pedido).filter_by(status='Separando').first()
        if pedido:  # Se existir um pedido pendente
            pedido.status = 'Pendente'  # Atualiza o status para 'Pendente'
            db.session.commit()  # Confirma as alterações
            print(f"Pedido {pedido.id} status atualizado para 'Pendente'")  # Loga a atualização
    except Exception as e:  # Lida com exceções
        db.session.rollback()  # Reverte a transação
        print(f"Erro ao atualizar status do pedido: {e}")  # Loga o erro
    checkStatusRobot()  # Verifica o status do robô

@socketio.on('medicineResponse')  # Listener de evento para respostas de medicamentos
def handle_medicine_response(data):
    print("medicineResponse: ", str(data))  # Loga os dados da resposta de medicamento
    emit("medicineFrontResponse", data, broadcast=True, include_self=True)  # Notifica o front-end sobre a resposta
    try:
        # Atualiza o status do pedido para 'Concluído'
        pedido = db.session.query(Pedido).filter_by(id=int(data['idFita'])).first()
        pedido.status = data['status']  # Atualiza o status
        db.session.commit()  # Confirma as alterações
        if data['status'] == 'Completo':  # Se o status for 'Completo'
            get_queue_medicine()  # Processa o próximo medicamento na fila
    except Exception as e:  # Lida com exceções
        db.session.rollback()  # Reverte a transação
        print(f"Erro ao atualizar status do pedido: {e}")  # Loga o erro

@socketio.on('log')  # Listener de evento para logs
def handle_message(data):
    print("log: ", str(data))  # Loga os dados do log
    try:
        # Recupera a última entrada de log
        ultimo_log = db.session.query(LogSistema).order_by(LogSistema.id.desc()).first()
        proximo_id = (ultimo_log.id + 1) if ultimo_log else 1  # Determina o próximo ID de log
        # Cria uma nova entrada de log
        log = LogSistema(id=proximo_id, acao=data['acao'], detalhes=data['detalhes'], usuario_id=int(data['usuario_id']))
        db.session.add(log)  # Adiciona o log ao banco de dados
        db.session.commit()  # Confirma as alterações
        print("log adicionado ao banco de dados")  # Loga a adição
    except Exception as e:  # Lida com exceções
        db.session.rollback()  # Reverte a transação
        print(f"Erro ao adicionar log ao banco de dados: {e}")  # Loga o erro

@socketio.on('medicineQueue')  # Listener de evento para fila de medicamentos
def handle_medicine_queue(data):
    print("medicineReload: ", str(data))  # Loga os dados da fila de medicamentos

@socketio.on('robotStatus')  # Listener de evento para atualizações de status do robô
def handle_robot_status(data):
    global robot_sid, x, y, z  # Usar variáveis globais
    print("robotStatus: ", str(data))  # Loga os dados de status do robô
    x = data.get('x', 0)  # Atualiza a coordenada X
    y = data.get('y', 0)  # Atualiza a coordenada Y
    z = data.get('z', 0)  # Atualiza a coordenada Z
    checkStatusRobot()  # Verifica o status do robô

def get_queue_medicine():  # Função para processar a fila de medicamentos
    global robot_pause  # Usar a variável global
    if robot_pause:  # Se o robô estiver pausado
        print("Robô está pausado. Ignorando processamento da fila de medicamentos.")  # Loga a pausa
        return  # Sai da função
    # Recupera o próximo pedido pendente, ordenado por data de criação e prioridade
    pedido_pendente = db.session.query(Pedido).filter_by(status='Pendente').order_by(Pedido.data_pedido, Pedido.prioridade).first()
    print(pedido_pendente)  # Loga o pedido pendente
    if pedido_pendente:  # Se existir um pedido pendente
        fita = {}  # Inicializa um dicionário para os compartimentos de medicamentos
        # Recupera todos os medicamentos associados ao pedido
        pedido_medicamentos = db.session.query(PedidoMedicamento).filter_by(pedido_id=pedido_pendente.id).all()
        for pedido_medicamento in pedido_medicamentos:  # Itera pelos medicamentos
            fita[pedido_medicamento.medicamento_id] = pedido_medicamento.quantidade  # Adiciona ao dicionário
        time.sleep(1)  # Atraso de 1 segundo
        # Emite os dados do medicamento para os clientes
        emit("medicine", {"idFita": pedido_pendente.id, "bins": fita}, namespace='/', broadcast=True, include_self=True)

def checkStatusRobot():  # Função para verificar o status do robô
    global robot_sid, robot_pause  # Usar variáveis globais
    if robot_pause:  # Se o robô estiver pausado
        status = 'Pausado'  # Define o status como 'Pausado'
        # Notifica o front-end sobre o status do robô
        emit("robotStatusFront", {"status": status, "x": x, "y": y, "z": z}, broadcast=True, include_self=True)
        return  # Sai da função
    if robot_sid:  # Se o robô estiver conectado
        status = 'Conectado'  # Define o status como 'Conectado'
    else:  # Se o robô não estiver conectado
        status = 'Desconectado'  # Define o status como 'Desconectado'
    # Notifica o front-end sobre o status do robô
    emit("robotStatusFront", {"status": status, "x": x, "y": y, "z": z}, broadcast=True, include_self=True)

# Rota para puxar as coordenadas do robô para a página de compartimentos
@robotFlask.route('/getRobotCoordinates', methods=["GET"])
def get_robot_coordinates():
    global x, y, z  # Usar variáveis globais
    return {"x": x, "y": y, "z": z}  # Retorna as coordenadas do robô