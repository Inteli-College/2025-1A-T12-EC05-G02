import lgpio
import time

SENSOR_PIN = 16  # Defina o pino correto

# Inicializa o chip GPIO
h = lgpio.gpiochip_open(0)

# Configura o pino como entrada
lgpio.gpio_claim_input(h, SENSOR_PIN)

print("Iniciando leitura do sensor TCRT5000...")
c = 0

print(h)

try:
    while True:
        if lgpio.gpio_read(h, SENSOR_PIN) == 0:
            c += 1
            print("Objeto detectado!", c)
        else:
            c += 1
            print("Nenhum objeto detectado.", c)
        time.sleep(0.5)
except KeyboardInterrupt:
    print("\nEncerrando...")
    lgpio.gpiochip_close(h)  # Fecha o acesso ao GPIO