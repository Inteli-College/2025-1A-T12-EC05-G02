from rich.console import Console
from rich.panel import Panel
import serial
from utils.logger import logger
import json
import datetime

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
            
            while True:
                if ser.in_waiting > 0:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    return line  # Retorna os dados lidos

    except serial.SerialException as e:
        print(f"Erro ao acessar a porta serial: {e}")
        return None
    
    finally:
        ser.close()

def processar_qrcode(dados):
    """Processa os dados do QR Code e exibe as informações do medicamento."""
    if not dados:
        print("Nenhum dado recebido do QR Code.")
        return
    
    try:
        info = json.loads(dados) 
        data_atual = datetime.now().strftime("%Y-%m-%d")
        
        console.print(
            (
                f"[bold yellow] \nInformações do Medicamento: {info} [/bold yellow]\n"
            ) 
        )
        
        medicamentoVencido = info["validade"] <= data_atual
        if medicamentoVencido:
            message = f"Medicamento {info["medicamento"]}  FORA DA VALIDADE | Data de validade: {info["validade"]} | Lote: {info["lote"]}"
            console.print(message)
            logger(message)
        
        for chave, valor in info.items():
            console.print(
                Panel
                (
                    f"[cyan] {chave.capitalize()}: {valor} [/cyan]"
                )
            )
        return medicamentoVencido
    
    except json.JSONDecodeError:
        print(f"Dado recebido em formato não json: {dados}")
        return
