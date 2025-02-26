import inquirer
from rich.console import Console
from rich.panel import Panel
from yaspin import yaspin
from serial.tools import list_ports

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
    port = chosen_port()
    print(bin_quantities, type(bin_quantities))
    return {"port": port, "bins": bin_quantities}

def available_ports():
    serial_ports = list_ports.comports()
    available_ports = [x.device for x in serial_ports]
    return available_ports if available_ports else ["Nenhuma porta disponível"]

def chosen_port():
    # Seleção da porta disponível
    ports = available_ports()  
    question = [
        inquirer.List(
            "port",
            message="Selecione uma porta disponível",
            choices=ports,
            carousel=True
        )
    ]
    port = inquirer.prompt(question)["port"]
    return port

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
        port = chosen_port()
        loading_effect("Retornando para home...\n")
        return {"action": "home", "port": port}

    elif "Visualização da posição atual" in action:
        loading_effect("Obtendo posição atual do PharmaBot...\n")
        port = chosen_port()
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

if __name__ == "__main__":
    result = terminal_start()