import serial
import json

def ler_qrcode(port, baudrate):
    """Lê dados do QR Code via porta serial e retorna a string decodificada."""
    try:
        with serial.Serial(port, baudrate, timeout=1) as ser:
            print(f"Conectado à porta {port} a {baudrate} baud.")
            print("Aguardando dados do QR Code...")
            
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
        info = json.loads(dados)  # Tenta carregar como JSON
        print("\nInformações do Medicamento:")
        for chave, valor in info.items():
            print(f"{chave.capitalize()}: {valor}")
    except json.JSONDecodeError:
        print(f"Dado recebido (não JSON): {dados}")

