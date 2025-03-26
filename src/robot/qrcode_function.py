from rich.console import Console
from rich.panel import Panel
import serial
import json
from time import time, sleep

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
            
            timelimit = time() + 120
            while time() < timelimit:
                if ser.in_waiting > 0:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    return line  # Retorna os dados lidos
                if time() == timelimit - 60 or time() == timelimit - 1:
                    tocar_buzzer()

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

def tocar_buzzer():
    buzz_command = b'\xEF\x01\xFF\xFF\xFF\xFF\x01\x00\x07\x00\x30\x00\x00\x37'
    
    ser = serial.Serial("/dev/ttyS0", baudrate=115200, timeout=1)
    ser.write(buzz_command)
    
    sleep(0.1)
    ser.close()
