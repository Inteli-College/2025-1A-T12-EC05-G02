import inquirer
from rich.console import Console
from rich.panel import Panel
from yaspin import yaspin
from serial.tools import list_ports

console = Console()

def welcome_screen():
    """Exibe a tela de boas-vindas."""
    console.clear()
    console.print(Panel("[bold cyan]Bem-vindo(a) ao terminal de acesso ao PharmaBot![/bold cyan]", expand=False))

def loading_effect(text="Processando..."):
    """Efeito de carregamento com spinner."""
    with yaspin(text=text, color="cyan") as spinner:
        spinner.hide()
        spinner.ok("✔")

def main_menu():
    """Exibe o menu principal e retorna a opção escolhida."""
    questions = [
        inquirer.List(
            "action",
            message="O que gostaria de realizar?",
            choices=[
                "1 - Separação de fita de medicamentos",
                "2 - Retornar para home",
                "3 - Visualização da posição atual",
                "4 - Checagem das posições das bins",
                "5 - Portas de conexão",
                "6 - Sair"
            ],
            carousel=True
        )
    ]
    answer = inquirer.prompt(questions)["action"]
    return answer

def test_port(pydobot):
    """Testa portas seriais disponíveis e retorna a primeira funcional."""
    ports = available_ports()  
    if not ports:
        console.print("[bold orange]Nenhuma porta serial encontrada. Conecte o Dobot e tente novamente.[/bold orange]")
        return
    
    for port in ports:
        console.print("[green]Testando portas de comunicação...[/green]")
        try:
            device = pydobot.Dobot(port=port, verbose=False)
            device.close()
            return port
        except Exception as e:
            console.print("[bold red] Não foi possível conectar na porta[/bold red]")

def remedy_collection(pydobot):  
    """Permite ao usuário selecionar bins e quantidades para coleta."""
    questions = [
        inquirer.Checkbox(
            'bins',
            message="Qual(is) bin(s) deseja coletar?",
            choices=['Dipirona', 'Flogoral', 'Cetopronazol', 'Buscopan', 'Neosalgina'],
            carousel=True
        )
    ]
    console.print("[yellow]Dica: utilize ↑, ↓ e [bold]barra de espaço[/bold] para selecionar suas opções![/yellow]\n")
    console.print("[yellow]Dica: utilize ENTER para confirmar sua escolha.[/yellow]\n")
    selected_bins = inquirer.prompt(questions)["bins"]

    # Input de quantidades de cada bin selecionado
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
    print(bin_quantities)
    return {"port": port, "bins": bin_quantities}

def available_ports():
    """Retorna uma lista de portas seriais disponíveis."""
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



def terminal_start(pydobot):
    """Executa a ação escolhida pelo usuário e retorna os parâmetros necessários."""
    action = main_menu()
    console.print("\n[bold yellow]→ Opção escolhida:[/bold yellow]", action, "\n")

    if "1" in action:
        loading_effect("Iniciando separação de fita de medicamentos...\n")
        port_bin = remedy_collection(pydobot)
        port = port_bin['port']
        bin_quantities = port_bin['bins']
        return {"action": "collect", "port": port, "bins": bin_quantities}

    elif "2" in action:
        # Seleção da porta disponível
        port = test_port(pydobot)
        loading_effect("Retornando para home...\n")
        return {"action": "home", "port": port}

    elif "3" in action:
        loading_effect("Obtendo posição atual do PharmaBot...\n")
        port = test_port(pydobot)
        return {"action": "current_pos", "port": port}

    elif "4" in action:
        loading_effect("Checando posições das bins...\n")
        return {"action": "check_bins"}

    elif "5" in action:
        loading_effect("Checando portas disponíveis...\n")
        ports = available_ports()
        return {"action": "ports", "ports": ports}

    elif "6" in action:
        console.print("[bold red]Encerrando o terminal.[/bold red]")
        return {"action": "exit"}