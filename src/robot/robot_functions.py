# Este arquivo concentra as funções de movimentação do robô Dobot Magician Lite.
from rich.console import Console
from rich.panel import Panel
from extensions import sio
from qrcode_function import ler_qrcode, processar_qrcode
from infra_function import ler_infra
from utils.logger import logger
import lgpio
import json
import config

console = Console()

port="/dev/ttyAMA0"
    
baudrate=9600

# Cria função de movimentação às bins especificadas
def move_to_bin(device, positions, drug, r, iter):
    if drug not in positions['bins']:
        logger(f"{drug} não encontrada!")
        raise ValueError(f"{drug} não encontrada!")

    counter = 0

    # Loop de iteração sobre a quantidade de coletas na mesma bin
    while counter < int(iter):
        if config.stop_flag:  # Verifica se o config.stop_flag foi ativado
            logger("[bold red]Movimentação interrompida pelo comando stopRobot.[/bold red]")
            return

        logger(f"[bold cyan]Buscando {drug}...[/bold cyan]")


        # Move o sugador para as posições da bin especificada
        device.movej_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            positions['bins'][drug]['pos_z'],
            r,
            wait=True
        )

        if config.stop_flag:  # Verifica novamente após o movimento
            logger("[bold red]Movimentação interrompida pelo comando stopRobot.[/bold red]")
            return

        logger(f"[bold yellow] ▪️ Movimento para {drug}[/bold yellow]\n")

        # Desce para ler QR Code

        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            80,
            r,
            wait=True
        )

        if config.stop_flag:  # Verifica novamente após o movimento
            logger("[bold red]Movimentação interrompida pelo comando stopRobot.[/bold red]")
            return

        # Lê o QR Code
        dados_qr = ler_qrcode(port=port, baudrate=baudrate)
        medicamentoVencido = processar_qrcode(dados_qr)
        
        if medicamentoVencido:
            break

        # Move no sentido positivo de x para melhor posicionar o sugador        
        device.movel_to(
            positions['bins'][drug]['pos_x'] + 19,
            positions['bins'][drug]['pos_y'],
            80,
            r,
            wait=True
        )

        if config.stop_flag:  # Verifica novamente após o movimento
            logger("[bold red]Movimentação interrompida pelo comando stopRobot.[/bold red]")
            return

        # Desce para sugar 
        device.movel_to(
            positions['bins'][drug]['pos_x'] + 19,
            positions['bins'][drug]['pos_y'],
            15,
            r,
            wait=True
        )

        if config.stop_flag:  # Verifica novamente após o movimento
            logger("[bold red]Movimentação interrompida pelo comando stopRobot.[/bold red]")
            return

        # Ativa a sucção do bico sugador
        logger(f"Ativando bico sugador\n")
        device.suck(True)

        dado_infra = ler_infra()

        device.movel_to(
            positions['bins'][drug]['pos_x'] + 19,
            positions['bins'][drug]['pos_y'],
            120,
            r,
            wait=True
        )

        if config.stop_flag:  # Verifica novamente após o movimento
            logger("[bold red]Movimentação interrompida pelo comando stopRobot.[/bold red]")
            return

        # Retorna o sugador para a posição de referência home
        logger(f"[bold yellow] ▪️ Retornando para ponto de referência[/bold yellow]\n")
        return_home(device, positions)  # Retorna o robô para a home

        logger(f"[bold yellow] ▪️ Movimento para o dispenser[/bold yellow]\n")


        # Move o braço robótico para as posições do dispenser
        device.movej_to(
            positions['presets']['dispenser']['pos_x'],
            positions['presets']['dispenser']['pos_y'],
            positions['presets']['dispenser']['pos_z'],
            r,
            wait=True
        )

        if config.stop_flag:  # Verifica novamente após o movimento
            logger("[bold red]Movimentação interrompida pelo comando stopRobot.[/bold red]")
            return

        # Desativa a sucção do bico sugador
        logger(f"✔ {drug} coletado!")
        device.suck(False)

        return_home(device, positions)

        # Adiciona unidade ao iterador
        counter += 1


# Função para definição da posição de referência home
def return_home(device, positions: dict):
    sio.emit('log', {'acao': 'Robot Log', 'detalhes': 'Retornando para home', 'usuario_id': 1})
    device.movej_to(
        positions['presets']['home']['pos_x'],
        positions['presets']['home']['pos_y'],
        positions['presets']['home']['pos_z'],
        0,
        wait=True
    )

# Função para retornar a posição atual do robô
def get_current_position(device):
    pos = device.pose()
    sio.emit('log', {'acao': 'Robot Log', 'detalhes': f'Posição atual: {pos}', 'usuario_id': 1})
    return {"x": pos[0], "y": pos[1], "z": pos[2]}
