from extensions import sio
from rich.console import Console
from rich.panel import Panel

console = Console()

def logger(data):
    sio.emit('log', {'acao': 'Robot Log', 'detalhes': data, 'usuario_id': 1})
    console.print(
            Panel
            (
                data
            )
        )