---
sidebar_position: 4
slug: /sprint-3/integracao/sensores
---

# Implementação dos sensores no código

&emsp; A utilização dos sensores MH-ET LIVE Scanner e TCRT5000 para leitura de QR Codes e validação da coleta de um medicamento no bin implica na necessidade de atualizar o código de funcionamento do robô.

&emsp; De acordo com o [Diagrama de Arquitetura em Blocos do projeto](docs/Sprint-2/Arquitetura/diagrama.md), tem-se que o microcontrolador - em nosso caso o *Raspberry Pi 5* - é responsável pela coleta de dados dos sensores e envio de comandos ao braço robótico *Magician Lite*. Desta forma, é necessário definir as funções de leitura dos sensores e atualizar o código de movimentação do braço robótico para a leitura dos sensores periféricos quando necessário. Portanto, os seguintes arquivos são adicionados:

- `infra_function.py`
- `qrcode_function.py`

&emsp; E, para implementação com o código de movimentação do braço robótico, altera-se o arquivo `robot_functions.py`. Abaixo são explorados os novos arquivos desenvolvidos:

## Arquivo `qrcode_function.py`:

&emsp; Inicia-se o arquivo `qrcode_function.py` importando algumas bibliotecas e funções de outros arquivos, como demonstrado abaixo: 

```python
from rich.console import Console
from rich.panel import Panel
import serial
import json
```

&emsp; Define-se a função `ler_qrcode()` para coletar os dados tratados enviados pelo sensor `MH-ET`. Utilizando a biblioteca `serial`, coletamos a leitura do sensor pela porta serial de dados do sensor. Abaixo, vemos a função `ler_qrcode()`:

```python
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
```

&emsp;Na função acima, destaca-se o uso da estrutura `try-except` para tentativa de execução e tratativa do erro `SerialException`, ou seja, acesso à porta serial definida. Além disso, utiliza-se o argumento `finally` para execução de um *snippet* de fechamento da comunicação com a porta serial definida - caso contrário, as próximas leituras realizadas pelo mesmo sensor na mesma porta poderão ser afetadas.

&emsp;Implementa-se, ainda, uma funcionalidade de tratamento e apresentação dos dados recebidos através da leitura do *QR Code*, definida na função `processar_qrcode()`, como explorado abaixo:

```python
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
```

&emsp;Nesta função, utiliza-se ainda a estrutura `try-except` para tentativa de desempacotamento do `json` de dados recebido pela leitura do `MH-ET LIVE`, observada no trecho abaixo:

```python
for chave, valor in info.items():
    console.print(
        Panel
        (
            f"[cyan] {chave.capitalize()}: {valor} [/cyan]"
        )
    )
return
```

&emsp; Portanto, o arquivo `qrcode_function.py` desenvolve duas funções fundamentais para a integração do `MH-ET` ao código funcional do robô.

## Arquivo `infra_function.py`:

&emsp; Similarmente ao arquivo anterior, `infra_function.py` faz a utilização de algumas bibliotecas para o próprio funcionamento do sensor `TCRT5000`. Importa-se as bibliotecas no trecho abaixo:

```python
import lgpio
import time
from rich.console import Console
from rich.panel import Panel
```

&emsp; O arquivo segue com a sua única declaração de função, a `ler_infra()`, reproduzida abaixo:

```python

def ler_infra():
    
    console = Console()
    
    GPIO_PIN = 17  
    
    # Inicializar o acesso ao pino da GPIO
    h = lgpio.gpiochip_open(0)

    # Configurar o pino como entrada com pull-up
    lgpio.gpio_claim_input(h, GPIO_PIN)

    try:
        while True:
            estado = lgpio.gpio_read(h, GPIO_PIN) 
            
            console.print(
                Panel
                (
                    f"[bold cyan] ▪️ {'Medicamento não detectado' if estado else 'Medicamento detectado'} [/bold cyan]\n"
                )
            )
            
            time.sleep(0.5)
            return

    except KeyboardInterrupt:
        print("\nEncerrando...")
        lgpio.gpiochip_close(h) 
    
    finally:
        lgpio.gpiochip_close(h)  
        
```

&emsp;Na função acima, alguns métodos da biblioteca `lgpio` são utilizados para a leitura dos dados retornados do sensor `TCRT5000`:

- `lgpio.gpiochip_open()`: Este método é utilizado para inicializar a comunicação entre o sensor e um chip GPIO do *Raspberry Pi 5*;
- `lgpio.gpio_claim_input(h, GPIO_PIN)`: Este método é utilizado para definir o pino `GPIO_PIN` como *input*, e preparar o chip interno `h` da *Raspberry Pi 5*, retornado de `lgpio.gpiochip_open()`, como responsável pela leitura de `GPIO_PIN`.
- `lgpio.gpio_read()`: Lê o estado atual do sensor (se está detectando um objeto à sua frente ou não), utilizando os argumentos definidos nos métodos anteriores.
- `lgpio.gpiochip_close()`: Este método encerra a utilização do chip `h` para leitura dos *inputs* de `GPIO_PIN`.

## Integração com código de movimentação do `Magician Lite`

&emsp; Para a completa integração dos sensores ao código já existente de movimentação do braço robótico, poucas inserções de métodos externos ao arquivo `robot_functions.py` foram utilizadas. Abaixo, explora-se as alterações e seus funcionamentos:

```python
from qrcode_function import ler_qrcode, processar_qrcode
from infra_function import ler_infra
```

&emsp; A primeira inserção de código foi realizada na importação de funções definidas em outros arquivos, como `ler_qrcode` e `processar_qrcode`, vindas do arquivo `qrcode_function.py`, e a função `ler_infra`, vinda de `infra_function.py`.

&emsp; Após as importações necessárias, algumas constantes importantes para a leitura dos sensores são definidas, sendo elas `port` e `baudrate`. Ambas são necessárias para comunicação ideal com o sensor `MH-ET`. Vemos a declaração das constantes abaixo:

```python
port="/dev/ttyAMA0"
    
baudrate=9600
```

&emsp; Durante a rotina de movimentos do braço robótico, dado o momento necessário, ativa-se a leitura do sensor `MH-ET`, para identificação do remédio presente na bin desejada. Utiliza-se, portanto, a função `ler_qrcode` e `processar_qrcode` para leitura e impressão dos dados lidos pelo sensor.

```python
#Lê o qrcode
dados_qr = ler_qrcode(port=port, baudrate=baudrate)
processar_qrcode(dados_qr)
```

&emsp; Nas chamadas de leitura e processamento dos dados acima, utiliza-se as constantes `port` e `baudrate` definidas anteriormente para configuração da comunicação entre o sensor `MH-ET` e *Raspberry Pi 5*, como explorado [anteriormente](#arquivo-qrcode_functionpy).

&emsp; Ainda na rotina de movimentos do braço robótico, após sucção pelo bico sugador, ativa-se o sensor infravermelho para checagem da efetiva coleta do medicamento:

```python
dado_infra = ler_infra()
```

&emsp; A integração dos sensores periféricos ao código, como explorada nesta seção, é fundamental para o funcionamento da solução *PharmaTech*, uma vez que são utilizados dos dados coletados pelos sensores para validação, contabilização e verificação da coleta realizada. 
