import RPi.GPIO as GPIO
import time

# Defini o número do pino do Raspberry Pi conectado ao OUT do sensor infra-vermelho
SENSOR_PIN = 12  # 12 é o GPIO no rasp

# Configuração do GPIO
GPIO.setmode(GPIO.BCM)  # Usa a numeração dos pinos do Broadcom (BCM)
GPIO.setup(SENSOR_PIN, GPIO.IN)

print("Iniciando leitura do sensor TCRT5000...")

try:
    while True:
        if GPIO.input(SENSOR_PIN) == 0:
            print("Objeto detectado!")
        else:
            print("Nenhum objeto detectado.")
        time.sleep(0.5)  # Pequena pausa para evitar leitura excessiva

except KeyboardInterrupt:
    print("\nEncerrando...")
    GPIO.cleanup()  # Libera os recursos do GPIO
