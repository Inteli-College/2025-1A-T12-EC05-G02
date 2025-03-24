import lgpio
import time
import datetime
from robot_functions import logger
from rich.console import Console
from rich.panel import Panel


def ler_infra():
    
    console = Console()
    
    # Definir o número da GPIO, não do pino da GPIO
    GPIO_PIN = 17  
    
    # Inicializar o acesso ao
    h = lgpio.gpiochip_open(0)

    # Configurar o pino como entrada com pull-up
    lgpio.gpio_claim_input(h, GPIO_PIN)

    try:
        while True:
            estado = lgpio.gpio_read(h, GPIO_PIN) 
            message = 'Medicamento não detectado.' if estado else 'Medicamento detectado.'
            
            console.print(
                Panel
                (
                    f"[bold cyan] ▪️ {message} [/bold cyan]\n"
                )
            )
            
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            logger(message + f"Timestamp: {current_time}")
            
            time.sleep(0.5)
            return

    except KeyboardInterrupt:
        print("\nEncerrando...")
        lgpio.gpiochip_close(h) 
    
    finally:
        lgpio.gpiochip_close(h)  
        
        