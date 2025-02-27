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

console = Console()  # Instância do console

class InteliDobot(pydobot.Dobot):
    def __init__(self, port=None, verbose=False):
        super().__init__(port=port, verbose=verbose)
    
    def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)
    
    def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)
    
    def SetSpeed(self, speed, acceleration):
        super().speed(speed,acceleration)

# Carrega o json com as coordenadas das bins
file_name = 'positions.json'
def get_pos(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)

# Carregar as posições do arquivo positions.json
positions = get_pos('positions.json')


while True:
    welcome_screen()
    result = terminal_start(pydobot)

    if 'port' in result:
        port = result['port']
        device = InteliDobot(port=port, verbose=False)

    action = result['action']

    if action == "collect":
        port = result['port']
        bins = result['bins']
        device.suck(False)
        return_home(device, positions)
        
        for bin in bins:
            move_to_bin(device, positions, bin, 0, bins[bin])

        if not (loop := return_to_menu()):
            break
    
    elif action == "home":
        port = result['port']
        return_home(device, positions)
        console.print("[green]Robô retornou para a posição inicial com sucesso![/green]")
        if not (loop := return_to_menu()):
            break

    elif action == "current_pos":
        port = result['port']
        (x, y, z, r, j1, j2, j3, j4) = device.pose()
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
    
    elif action == "check_bins":
        console.print("[bold]Coordenadas das Bins:[/bold]")
        for remedio in positions["bins"]:
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
    
    elif action == "ports":
        port = test_port(pydobot)
        console.print(f"[green]Sua porta [bold]{port}[/bold] está pronta para uso![/green]")

        if not (loop := return_to_menu()):
            break

    elif action == "exit":
        console.print("[red]Saindo do programa...[/red]")
        break