# Este arquivo concentra as funções de movimentação do robô Dobot Magician Lite.
from rich.console import Console
from rich.panel import Panel

console = Console()

# Cria função de movimentação às bins especificadas
def move_to_bin(device, positions, drug, r, iter):
    if drug not in positions['bins']:
        raise ValueError(f"{drug} não encontrada!")

    counter = 0

    # Loop de iteração sobre a quantidade de coletas na mesma bin
    while counter < int(iter):
        
        console.print(
            Panel
            (
                f"[bold cyan]Buscando {drug}...[/bold cyan]"
            )
        )

        # Move o sugador para as posições da bin especificada
        device.movej_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            positions['bins'][drug]['pos_z'],
            r,
            wait=True
        )

        console.print(
            (
                f"[bold yellow] ▪️ Movimento para {drug}[/bold yellow]\n"
            )
        )
        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            18,
            r,
            wait=True
        )

        # Ativa a sucção do bico sugador
        console.print(
            (
                "[bold yellow] ▪️ Ativando bico sugador[/bold yellow]\n"
            )   
        )
        device.suck(True)

        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            120,
            r,
            wait=True
        )

        # Retorna o sugador para a posição de referência home
        console.print(
            (
                "[bold yellow] ▪️ Retornando para ponto de referência[/bold yellow]\n"
            )
        )
        
        return_home(device, positions) # Retorna o robô para a home
        
        console.print(
            (
                "[bold yellow] ▪️ Movimento para o dispenser[/bold yellow]\n"
            )
        )
        
        # Move o braço robótico para as posições do dispenser
        device.movej_to(
            positions['presets']['dispenser']['pos_x'],
            positions['presets']['dispenser']['pos_y'],
            positions['presets']['dispenser']['pos_z'],
            r,
            wait=True
        )
        
        # Desativa a sucção do bico sugador
        console.print(
            Panel
            (
                f"[bold green]✔ {drug} coletado![/bold green]\n"
            )
        )
        device.suck(False)

        return_home(device, positions)

        # Adiciona unidade ao iterador
        counter += 1


# Função para definição da posição de referência home
def return_home(device, positions: dict):
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
    return {"x": pos[0], "y": pos[1], "z": pos[2]}