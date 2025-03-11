import serial, time

def main():
    # Configurar a porta serial
    port = "/dev/ttyAMA0"  # Altere para a porta correta (ex: /dev/ttyS0, /dev/ttyUSB1)
    # port = "/dev/ttyUSB0"  # Altere para a porta correta (ex: /dev/ttyS0, /dev/ttyUSB1)
    baudrate = 9600  # Ajuste conforme necessário
    
    try:
        with serial.Serial(port, baudrate, timeout=1) as ser:
            print(f"Conectado à porta {port} a {baudrate} baud.")
            print("Aguardando dados...")
            
            while True:
                # time.sleep(0.1)
                if ser.in_waiting > 0:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    print(f"Recebido: {line}")
    
    except serial.SerialException as e:
        print(f"Erro ao acessar a porta serial: {e}")
    except KeyboardInterrupt:
        print("Encerrando o programa.")

if __name__ == "__main__":
    main()
