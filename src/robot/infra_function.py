import lgpio
import time
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
        estado = lgpio.gpio_read(h, GPIO_PIN) 
        
        console.print(
            Panel
            (
                f"[bold cyan] ▪️ {'Medicamento não detectado' if estado else 'Medicamento detectado'} [/bold cyan]\n"
            )
        )
        
        time.sleep(0.5)

    except KeyboardInterrupt:
        print("\nEncerrando...")
        lgpio.gpiochip_close(h) 
    
    finally:
        lgpio.gpiochip_close(h)  
        
        