# Importa bibliotecas e funções a serem utilizadas.
import pydobot.enums
import pydobot.enums.CommunicationProtocolIDs
import pydobot.enums.ControlValues
import pydobot.message
import json
import pydobot
from rich.console import Console
from rich.panel import Panel
from robot_functions import move_to_bin, return_home
from cli.cli_functions import terminal_start, welcome_screen, return_to_menu, test_port
from extensions import sio

console = Console()  # Instancia do console.

# Variável global para armazenar a porta do robô
robot_port = None

# Define classe InteliDobot, que herda classe pai pydobot.Dobot
class InteliDobot(pydobot.Dobot):
    port = None
    def __init__(self, port=None, verbose=False):
        global robot_port
        if robot_port is not None:
            self.port = robot_port
        elif port is not None:
            self.port = port
            robot_port = port
        else:
            self.port = test_port(pydobot)
            robot_port = self.port
        super().__init__(port=self.port, verbose=verbose)
    
    def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)
    
    def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)
    
    def SetSpeed(self, speed, acceleration):
        super().speed(speed, acceleration)

# Carrega o json com as coordenadas das bins.
file_name = 'positions.json'
def get_pos(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)

# Carregar as posições do arquivo positions.json.
positions = get_pos('positions.json')

# Defina os eventos que você quer escutar
@sio.event
def connect():
    print('Conectado ao servidor!')
    sio.emit('connectResponse', {'data': 'Robo conectado ao servidor'})

@sio.event
def disconnect():
    print('Desconectado do servidor.')
    sio.emit('disconnectResponse', {'data': 'Robo desconectado do servidor'})

# listing to the medicine event
@sio.event
def medicine(data):
    print("medicine: ", str(data))
    
    result = {
        'action': 'collect', 'bins': data['bins'], 'idFita': data['idFita']
    }
    separateMedicine(result)

def separateMedicine(result):
    device = InteliDobot(verbose=False)  # Inicializa o robô Dobot com a porta detectada.
    bins = result['bins']
    print(result)
    device.suck(False)  # Desliga a sucção do robô.
    return_home(device, positions)  # Retorna o robô para a home.
    
    sio.emit('log', {'acao': 'Robot Log - Separar', 'detalhes': 'Iniciando separação de fita de medicamentos, ID: ' + str(result['idFita']), 'usuario_id': 1})
    sio.emit('medicineResponse', {'status': 'Separando', "idFita": str(result['idFita'])})
    
    for bin in bins:  # Percorre os bins e executa a movimentação para coleta.
        move_to_bin(device, positions, bin, 0, bins[bin])
        
    sio.emit('medicineResponse', {'status': 'Completo', "idFita": str(result['idFita'])})


sio.emit('connectResponse', {'data': 'Robo conectado ao servidor'})

while True:  # Loop principal, se mantém até o usuário decidir sair.
    welcome_screen()  # Exibe a menu inicial.
    result = terminal_start(pydobot)  # Captura a entrada do usuário e informações da conexão com o robô.

    if 'port' in result:  # Se a porta estiver disponível nos resultados...
        port = result['port']
        device = InteliDobot(port=port, verbose=False)  # Inicializa o robô Dobot com a porta detectada.
    else:
        device = InteliDobot(verbose=False)  # Inicializa o robô Dobot com a porta armazenada.

    action = result['action']  # Obtém a ação escolhida pelo usuário.

    if action == "collect":  # Se a ação for "coletar"
        result["idFita"] = 1
        separateMedicine(result)  # Separa os medicamentos.
        if not (loop := return_to_menu()):  # Pergunta se o usuário quer continuar. Se não, sai do loop.
            break
    
    elif action == "home":  # Se a ação for "retornar para home"
        return_home(device, positions)  # Move o robô para a posição inicial.
        console.print("[green]Robô retornou para a posição inicial com sucesso![/green]")

        if not (loop := return_to_menu()):  
            break

    elif action == "current_pos":  # Se a ação for "ver posição atual"
        (x, y, z, r, j1, j2, j3, j4) = device.pose()  # Retorna a posição do robô.
        console.print(
            Panel(
                f"Posição atual do robô:\n"
                f"x: {x}\ny: {y}\nz: {z}\nj1: {j1}\nj2: {j2}\nj3: {j3}\nj4: {j4}",
                title="Posição Atual",
                border_style="blue"
            )
        )

        if not (loop := return_to_menu()):
            break
    
    elif action == "check_bins":  # Se a ação for "verificar bins"
        console.print("[bold]Coordenadas das Bins:[/bold]")
        for remedio in positions["bins"]:  # Percorre cada bin e exibe suas coordenadas.
            console.print(
                Panel(
                    f"Remédio: {remedio}\n"
                    f"Coordenada X: {positions['bins'][remedio]['pos_x']}\n"
                    f"Coordenada Y: {positions['bins'][remedio]['pos_y']}\n"
                    f"Coordenada Z: {positions['bins'][remedio]['pos_z']}",
                    title=f"Bin: {remedio}",
                    border_style="magenta"
                )
            )
            
        if not (loop := return_to_menu()):
            break
    
    elif action == "ports":  # Se a ação for "testar porta"
        port = test_port(pydobot)  # Testa a porta de comunicação.
        console.print(f"[green]Sua porta [bold]{port}[/bold] está pronta para uso![/green]")

        if not (loop := return_to_menu()):
            break

    elif action == "exit":  # Se a ação for "sair"
        console.print("[red]Saindo do programa...[/red]")
        break  # Sai do loop principal, encerrando o programa.

