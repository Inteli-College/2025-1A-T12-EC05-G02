from rich.console import Console
from rich.panel import Panel
import serial
import json

console = Console()

def ler_qrcode(port, baudrate):
    """Lê dados do QR Code via porta serial e retorna a string decodificada."""
    try:
        with serial.Serial(port, baudrate, timeout=1) as ser:
            
            console.print(
                (
                    f"[bold yellow] ▪️ Conectado à porta {port} a {baudrate} baud [/bold yellow]\n"
                ) 
            )
             
            console.print(
                (
                    "[bold yellow] ▪️ Aguardando dados do QR Code... [/bold yellow]\n"
                ) 
            )
               
            # print(f"Conectado à porta {port} a {baudrate} baud.")
            # print("Aguardando dados do QR Code...")
            
            while True:
                if ser.in_waiting > 0:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    return line  # Retorna os dados lidos

    except serial.SerialException as e:
        print(f"Erro ao acessar a porta serial: {e}")
        return None

def processar_qrcode(dados):
    """Processa os dados do QR Code e exibe as informações do medicamento."""
    if not dados:
        print("Nenhum dado recebido do QR Code.")
        return
    
    try:
        info = json.loads(dados) 
        
        console.print(
            (
                "[bold yellow] \nInformações do Medicamento: [/bold yellow]\n"
            ) 
        )
        
        # print("\nInformações do Medicamento:")
        
        for chave, valor in info.items():
            console.print(
                Panel
                (
                    f"[cyan] {chave.capitalize()}: {valor} [/cyan]"
                )
            )
        return
    
    except json.JSONDecodeError:
        print(f"Dado recebido (não JSON): {dados}")
        return
