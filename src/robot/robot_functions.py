# Este arquivo concentra as funções de movimentação do robô Dobot Magician Lite.
from rich.console import Console
from rich.panel import Panel
from extensions import sio
from qrcode_function import ler_qrcode, processar_qrcode
from infra_function import ler_infra
import lgpio
import time


console = Console()

# Cria função de movimentação às bins especificadas
def move_to_bin(device, positions, drug, r, iter):
    if drug not in positions['bins']:
        logger(f"[bold red]{drug} não encontrada![/bold red]")
        raise ValueError(f"{drug} não encontrada!")

    counter = 0

    # Loop de iteração sobre a quantidade de coletas na mesma bin
    while counter < int(iter):
        
        logger(f"[bold cyan]Buscando {drug}...[/bold cyan]")

        # Move o sugador para as posições da bin especificada
        device.movej_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            positions['bins'][drug]['pos_z'],
            r,
            wait=True
        )

        logger(f"[bold yellow] ▪️ Movimento para {drug}[/bold yellow]\n")
        
    
        
        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            90,
            r,
            wait=True
        )
        

        dados_qr = ler_qrcode(port=port, baudrate=baudrate)
        processar_qrcode(dados_qr)


                
        #***********************************
        
        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            90,
            r,
            wait=True
        )
        
        
        # dados_qr = ler_qrcode(port=port,baudrate=baudrate)
        # processar_qrcode(dados_qr)
        dados_qr = ler_qrcode(port=port, baudrate=baudrate)
        processar_qrcode(dados_qr)


                
        #***********************************
        
        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            15,
            17,
            r,
            wait=True
        )
        

        # Ativa a sucção do bico sugador
        logger(f"[bold yellow] ▪️ Ativando bico sugador[/bold yellow]\n")
        device.suck(True)

        dado_infra = ler_infra()
        
        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            120,
            r,
            wait=True
        )

        # Retorna o sugador para a posição de referência home
        logger(f"[bold yellow] ▪️ Retornando para ponto de referência[/bold yellow]\n")
        
        return_home(device, positions) # Retorna o robô para a home
        
        logger(f"[bold yellow] ▪️ Movimento para o dispenser[/bold yellow]\n")
        
        # Move o braço robótico para as posições do dispenser
        device.movej_to(
            positions['presets']['dispenser']['pos_x'],
            positions['presets']['dispenser']['pos_y'],
            positions['presets']['dispenser']['pos_z'],
            r,
            wait=True
        )
        
        # Desativa a sucção do bico sugador
        logger(f"[bold green]✔ {drug} coletado![/bold green]")
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

def logger(data):
    sio.emit('log', {'acao': 'Robot Log', 'detalhes': data, 'usuario_id': 1})
    console.print(
            Panel
            (
                data
            )
        )