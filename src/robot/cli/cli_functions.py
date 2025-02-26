import inquirer
import sys
import os
from rich.console import Console
from rich.panel import Panel
from yaspin import yaspin
from serial.tools import list_ports

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
console = Console()

def welcome_screen():
    console.clear()
    console.print(Panel("[bold cyan]Bem-vindo(a) ao terminal de acesso ao PharmaBot![/bold cyan]", expand=False))

def loading_effect(text="Processando..."):
    with yaspin(text=text, color="cyan") as spinner:
        spinner.hide()
        spinner.ok("✔")

def main_menu():
    questions = [
        inquirer.List(
            "action",
            message="O que gostaria de realizar?",
            choices=[
                "Separação de fita de medicamentos",
                "Retornar para home",
                "Visualização da posição atual",
                "Checagem das posições das bins",
                "Portas de conexão",
                "Sair"
            ],
            carousel=True
        )
    ]
    answer = inquirer.prompt(questions)["action"]
    return answer

def test_port(pydobot):
    ports = available_ports()  
    if not ports:
        console.print("[bold orange]Nenhuma porta serial encontrada. Conecte o Dobot e tente novamente.[/bold orange]")
        return
    
    for port in ports:
        console.print("[orange]Testando portas de comunicação...[/orange]")
        try:
            device = pydobot.Dobot(port=port, verbose=False)
            device.close()
            console.print(f"[green]Sua porta {port} está pronta para uso![/green]")
            return port
        except Exception as e:
            console.print("[bold red] Não foi possível conectar na porta[/bold red]")

def remedy_collection():  
    # Seleção das bins
    questions = [
        inquirer.Checkbox(
            'bins',
            message="Qual(is) bin(s) deseja coletar?",
            choices=['Dipirona', 'Flogoral', 'Cetopronazol', 'Buscopan', 'Neosalgina'],
            carousel=True
        )
    ]
    console.print("[yellow]Dica: utilize ↑, ↓ e [bold]barra de espaço[/bold] para selecionar suas opções![/yellow]")
    selected_bins = inquirer.prompt(questions)["bins"]

    # Input de quantidades
    bin_quantities = {}
    for bin in selected_bins:
        question = [
            inquirer.Text(
                bin,
                message=f"Quantos {bin} deseja coletar?",
                validate=lambda _, x: x.isdigit() and int(x) > 0
            )
        ]
        quantity = inquirer.prompt(question)[bin]
        bin_quantities[bin] = int(quantity)
    
    # Seleção da porta disponível
    port = test_port(pydobot)
    print(bin_quantities, type(bin_quantities))
    return {"port": port, "bins": bin_quantities}

def available_ports():
    serial_ports = list_ports.comports()
    available_ports = [x.device for x in serial_ports]
    return available_ports if available_ports else ["Nenhuma porta disponível"]

def return_to_menu():
    """Pergunta se o usuário deseja retornar ao menu principal."""
    question = [
        inquirer.List(
            "return_menu",
            message="Deseja retornar ao menu de escolhas?",
            choices=["Sim", "Não"],
            carousel=True
        )
    ]
    answer = inquirer.prompt(question)["return_menu"]
    if answer == "Sim":
        console.clear()
        return True
    else:
        console.print("[bold red]Encerrando o terminal.[/bold red]")
        return False



def terminal_start():
    action = main_menu()
    console.print("\n[bold yellow]→ Opção escolhida:[/bold yellow]", action, "\n")

    if "Separação de fita de medicamentos" in action:
        loading_effect("Iniciando separação de fita de medicamentos...\n")
        port_bin = remedy_collection()
        port = port_bin['port']
        bin_quantities = port_bin['bins']
        return {"action": "collect", "port": port, "bins": bin_quantities}

    elif "Retornar para home" in action:
        # Seleção da porta disponível
        port = test_port(pydobot)
        loading_effect("Retornando para home...\n")
        return {"action": "home", "port": port}

    elif "Visualização da posição atual" in action:
        loading_effect("Obtendo posição atual do PharmaBot...\n")
        port = test_port(pydobot)
        return {"action": "current_pos", "port": port}

    elif "Checagem das posições das bins" in action:
        loading_effect("Checando posições das bins...\n")
        return {"action": "check_bins"}

    elif "Portas de conexão" in action:
        loading_effect("Checando portas disponíveis...\n")
        ports = available_ports()
        return {"action": "ports", "ports": ports}

    elif "Sair" in action:
        console.print("[bold red]Encerrando o terminal.[/bold red]")
        return {"action": "exit"}