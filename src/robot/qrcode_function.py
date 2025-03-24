from rich.console import Console
from rich.panel import Panel
import serial
import json
from datetime import datetime
import logging
from robot_functions import logger

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
            
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            logger(f"QR Code lido com sucesso. Timestamp: {current_time}")
            
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
        
        console.print(
            (
                "[bold yellow] \nInformações do Medicamento: [/bold yellow]\n"
            ) 
        )
        
        # print("\nInformações do Medicamento:")
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        logger(f"O QR Code lido foi processado. Dados: {info}  \n Timestamp: {current_time}")
        
        for chave, valor in info.items():
            console.print(
                Panel
                (
                    f"[cyan] {chave.capitalize()}: {valor} [/cyan]"
                )
            )
        return
    
    except json.JSONDecodeError:
        print(f"Dado recebido em formato não json: {dados}")
        return
