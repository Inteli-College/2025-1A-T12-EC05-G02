import lgpio
import time

def ler_infra():
    # Definir o número da GPIO, não do pino da GPIO
    GPIO_PIN = 17  
    # Inicializar o acesso ao
    h = lgpio.gpiochip_open(0)

    # Configurar o pino como entrada com pull-up
    lgpio.gpio_claim_input(h, GPIO_PIN)

    try:
        while True:
            estado = lgpio.gpio_read(h, GPIO_PIN)  # Lê o estado do pino
            print(f"Estado do pino {GPIO_PIN}: {'NAO DETECTADO' if estado else 'DETECTADO'}")
            time.sleep(0.5)
            return

    except KeyboardInterrupt:
        print("\nEncerrando...")
        lgpio.gpiochip_close(h) 
    
    finally:
        lgpio.gpiochip_close(h)  # Libera o acesso ao GPIO
        
        