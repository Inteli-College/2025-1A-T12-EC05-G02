import inquirer
from rich.console import Console
from rich.panel import Panel
from yaspin import yaspin

console = Console()

def welcome_screen():
    console.print(Panel("[bold cyan]Bem-vindo(a) ao terminal de acesso ao PharmaBot![/bold cyan]", expand=False))

def loading_effect(text="Processando..."):
    with yaspin(text=text, color="cyan") as spinner:
        spinner.ok("✔")

def main_menu():
    questions = [
        inquirer.List(
            "action",
            message="O que gostaria de realizar?",
            choices=[
                "▪️ Separação de fita de medicamentos",
                "▪️ Retornar para home",
                "▪️ Visualização da posição atual",
                "▪️ Checagem das posições das bins",
                "✖️ Sair"
            ],
        )
    ]

    answer = inquirer.prompt(questions)["action"]
    return answer


def remedy_collection():  
    # Passo 1: Pergunta quais bins deseja coletar
    questions = [
        inquirer.Checkbox(
            'bins',
            message="Qual(is) bin(s) deseja coletar?",
            choices=['Bin 1', 'Bin 2', 'Bin 3', 'Bin 4', 'Bin 5'],
        )
    ]
    console.print("[yellow]Dica: utilize ↑, ↓ e barra de espaço para selecionar suas opções![/yellow]")
    selected_bins = inquirer.prompt(questions)["bins"]

    # Passo 2: Pergunta quantos medicamentos por bin
    bin_quantities = {}
    for bin in selected_bins:
        question = [
            inquirer.Text(
                bin,
                message=f"Quantos medicamentos da {bin} deseja coletar?",
                validate=lambda _, x: x.isdigit() and int(x) > 0
            )
        ]
        quantity = inquirer.prompt(question)[bin]
        bin_quantities[bin] = int(quantity)

    return bin_quantities


def terminal_start():
    welcome_screen()
    
    while True:
        action = main_menu()
        console.print("\n[bold yellow]→ Opção escolhida:[/bold yellow]", action, "\n")

        if "Separação de fita de medicamentos" in action:
            loading_effect("Iniciando separação de fita de medicamentos...")
            return remedy_collection()
        
        elif "Retornar para home" in action:
            loading_effect("Retornando para home...")
            return "home"
        
        elif "Visualização da posição atual" in action:
            loading_effect("Obtendo posição atual do PharmaBot...")
            return "current_pos"
        
        elif "Checagem das posições das bins" in action:
            loading_effect("Checando posições das bins...")
            return "check_bins"
        
        elif "Sair" in action:
            console.print("[bold red]Encerrando o terminal.[/bold red]")
            return "sair"

if __name__ == "__main__":
    result = terminal_start()