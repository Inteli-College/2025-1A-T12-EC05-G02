---
sidebar_position: 1
slug: /sprint-2/sistema-automacao/funcionamento-atual
---

# Documentação do código

&emsp; Durante o desenvolvimento do segunda sprint, implementou-se um sistema básico de automação, no qual foi desenvolvido uma interface por linha de comando para trocar informações com o braço de robótico. Nesse sentido, abaixo são apresentados as tecnologias que foram utilizadas, como o modelo do braço robótico e as bibliotecas externas, além de uma breve explicação sobre as funcionalidades de cada arquivo e os comandos que o braço robótico é capaz de executar. Portanto, a presente documentação tem como objetivo facilitar o entendimento do funcionamento do robô, além disso, ao final expõem-se o vídeo que exemflifica tal operação. O guia para a inicialização da CLI pode ser acessada pelo seguinte _[link](../Sistema%20de%20Automação/InicializaçãoDaCLI.md)_.

## 1. Tecnologias utilizadas

### 1.1. [Dobot Magician Lite](https://minipa.com.br/images/Manual/Magician-Lite-1101-BR.pdf)

&emsp; O *Magician Lite* é um braço robótico multifuncional voltado para a educação de treinamento prático. Nesse sentido, o robô apresenta uma capacidade de carga de 250g, possui quatro eixos (Figura 1) e apresenta um alcance máximo de 340mm. Além disso, o Dobot oferece um controlador externo denominado “*Magic Box*”, o qual separa o algoritmo de controle de movimentação e as tarefas do usuário para permitir maior conveniência de programação e criação. O grupo *PharmaTech* nomeou seu braço mecânico *Magician Lite* para *PharmaBot*.

<p style={{textAlign: 'center'}}>Figura 1 - Articulações do robô Magician Lite</p>

![Articulações do Magician Lite](/img/arquitetura/magician_joints.png)

<p style={{textAlign: 'center'}}>Fonte: Manual de Instruções Dobot Magician Lite (s.d.)</p>

### 1.2. Comunicação remota

&emsp; O grupo *PharmaTech* decidiu utilizar o microcontrolador *Raspberry Pi 5* por conta da possibilidade de comunicação via Wi-Fi, inexistente no dispositivo "*Magic Box*" supracitado. Conectando o controlador *Raspberry Pi 5* ao WiFi e ao *Virtual Studio Code* via *SSH*, é possível estabelecer uma comunicação *wireless* entre o dispositivo do usuário (*Notebook* ou *Desktop*) com o braço robótico *Magician Lite*, ou seja, recebendo os comandos do usuário. Por fim, os usuários podem expandir uma ampla linha de sensores e acessórios relacionados para obter mais possibilidades.

### 1.3. Bibliotecas

- **Pydobot:** Essa biblioteca foi desenvolvida com o objetivo de simplificar o controle do Dobot Magician Lite, dessa forma, ele permite o envio de comandos ao robô para movimentação, controle de acessórios e leitura de sensores.

- **Inquirer:** Essa biblioteca é utilizada para criar consultas interativos no terminal, exibindo resultados de forma estruturada para facilitar a visualização e análise de dados.

- **Yaspin:** Essa biblioteca é utilizada para exibir os spinners, ou seja, indicadores visuais usados para mostrar que um processo está em andamento, pelo terminal de forma simples e personalizável. 

- **Rich:** A biblioteca Rich é utilizada para incrementar estilização e cores aos outputs do terminal, sendo possível criar tabelas e painéis para melhor visualização das informações.

---

## 2. Código e estrutura de arquivos

&emsp; Abaixo, encontra-se as descrições das funcionalidades desenvolvidas durante a Sprint 2 no tocante ao robô Magician Lite e comandos via CLI (*Command Line Input*).

&emsp; Ao passo da Sprint 2, o repositório do grupo _PharmaTech_ conta com os seguintes arquivos de código:

- _[`main.py:`](../../../../src/robot/main.py)_ Este arquivo inicializa o funcionamento do braço robótico

- _[`robot_functions.py`](../../../../src/robot/robot_functions.py)_ Este arquivo armazena as funções de movimentação do robô Dobot Magician Lite.

- _[`positions.json:`](../../../../src/robot/positions.json)_ Este arquivo armazena as coordenadas em x, y, e z dos medicamentos

- _[`cli_functions.py:`](../../../../src/robot/cli/cli_functions.py)_ Este arquivo implementa um terminal interativo para o controle do braço robótico.  

- _[`requirements.txt:`](../../../../src/robot/requirements.txt)_ Este arquivo armazena as dependências do presente projeto em python, especificando os pacotes necessários e suas versões. 

&emsp; Explora-se abaixo as funções principais de cada arquivo, suas resposabilidades e possíveis interações com o usuário do sistema de automatização.

---

### 2.1. Estrutura de pastas e arquivos

&emsp; A estrutura de pastas do presente [repositório do GitHub](https://github.com/Inteli-College/2025-1A-T12-EC05-G02) encontra-se abaixo:

```
.
└── .github
└── docs
└── src
└──.gitignore
└──README.md

```
&emsp; Nesse sentido, com o objetivo de explicar o código-fonte, seleciona-se a pasta "src":

```
src
    └── robot    
        └── cli
            ├── __init__.py
            ├── cli_functions.py
        ├── main.py
        ├── positions.json
        ├── requirements.txt
        ├── robot_functions.py

```

---

### 2.2. Arquivo `main.py`

&emsp; O arquivo `main.py` é responsável por **inicializar o braço robótico, realizar a leitura do arquivo das posições pré definidas das bins e implementar a lógica de leitura das decisões do usuário pela linha de comando**. `main.py`, portanto, é iniciado importando as bibliotecas e funções necessárias para o funcionamento nominal do arquivo:

```python

import pydobot.enums
import pydobot.enums.CommunicationProtocolIDs
import pydobot.enums.ControlValues
import pydobot.message
import json
import pydobot
from rich.console import Console
from rich.panel import Panel
from robot_functions import move_to_bin, return_home
from cli.cli_functions import terminal_start, welcome_screen, return_to_menu, test_port

```
&emsp; Após a importação das bibliotecas e funções necessárias, extende-se a classe `pydobot.Dobot` advinda da biblioteca `pydobot` e define-se a classe personalizada `InteliDobot`, que herda métodos e funcionalidades da classe `pydobot.Dobot`.

```python
class InteliDobot(pydobot.Dobot):
    def __init__(self, port=None, verbose=False):
        super().__init__(port=port, verbose=verbose)
    
    def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)
    
    def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)

```

&emsp; Define-se, portanto, alguns métodos essenciais do funcionamento do `Magician Lite` na aplicação *PharmaBot*:

#### `movej_to()`:

```python
def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)
```

&emsp;&emsp;**Funcionalidade:** O método `movej_to` contrai a expressão 'move-joint to', ou seja, movimenta o robô baseado em suas articulações, conforme representado na Figura 1. A movimentação articulada preza, usualmente, pela velocidade, em detrimento da precisão.

&emsp;&emsp;**Método de atuação:** `movej_to` recebe as coordenadas x, y, z, o valor de rotação r da ponta de atuação do braço robótico e o parâmetro `wait`. Em sua definição, o método utiliza funções estipulada a partir da classe de herança `pydobot.Dobot` para definir a movimentação do braço robótico no modo `joint-by-joint` em `mode=pydobot.enums.PTPMode.MOVJ_XYZ`. O parâmetro `wait` constringe o programa a executar a próxima linha de comando apenas ao finalizar do atual movimento.

&emsp;&emsp;**Exemplo de aplicação:**
```python
# Exemplo de aplicação do método movej_to:
dobot = InteliDobot(port="/dev/ttyACM0", verbose=True)
dobot.movej_to(
        120,
        60,
        40,
        60,
        wait=True
    )
```
&emsp;&emsp;O código acima cria uma instância da classe InteliDobot na porta serial `/dev/ttyACM0` e define a movimentação articulada às coordenadas x = 120, y = 60 e z = 40, com valor de rotação do bico de atuação do `Magician Lite` em 60 graus.

#### `movel_to()`:

```python
def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)
```

&emsp;&emsp;**Funcionalidade:** Similarmente ao método supracitado, o método `movel_to` advém da expressão 'move-linear to', ou seja, movimenta o robô linearmente a partir das coordenadas atuais do robô. Desta forma, a movimentação linear busca maximizar a precisão nos movimentos, em detrimento da velocidade de movimentação.

&emsp;&emsp;**Método de atuação:** `movel_to` recebe as coordenadas x, y, z, o valor de rotação r da ponta de atuação e o parâmetro `wait`. Tal qual `movej_to`, o método utiliza funções estipulada a partir da classe de herança `pydobot.Dobot` para definir a movimentação linear do braço robótico em `mode=pydobot.enums.PTPMode.MOVL_XYZ`. A partir desta movimentação, tem-se a garantia que a ponta de atuação do braço robótico seguirá uma trajetória em linha reta, considerando os 3 eixos de movimentação. Finalmente, o parâmetro `wait` constringe o programa a executar a próxima linha de comando apenas ao finalizar do atual movimento.

&emsp;&emsp;**Exemplo de aplicação:**
```python
# Exemplo de aplicação do método movej_to:
dobot = InteliDobot(port="/dev/ttyACM0", verbose=True)
dobot.movel_to(
        60,
        120,
        100,
        0,
        wait=True
    )
```
&emsp;&emsp;O código acima cria uma instância da classe InteliDobot na porta serial `/dev/ttyACM0` e define a movimentação linear às coordenadas x = 60, y = 120 e z = 100, com valor nulo de rotação do bico de atuação do `Magician Lite`. Portanto, o braço robótico se movimenta em trajetória linear a partir de suas coordenadas atuais para as coordenadas passadas ao método `movel_to`.

#### Carregamento do arquivo de coordenada das bins:

```python
# Carrega o json com as coordenadas das bins
file_name = 'positions.json'
def get_pos(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)

# Carregar as posições do arquivo positions.json
positions = get_pos('positions.json')
```

&emsp;&emsp;**Funcionalidade:** O código acima cria a função `get_pos`, que é responsável por ler o arquivo `positions.json` e retornar suas informações em um dicionário em python, salvo na variável `positions`. Esta ação permite a consulta de coordenadas pré definidas em `positions.json` para futuras movimentações do robô. 

#### Lógica de funcionamento do arquivo `main.py`:

&emsp;&emsp; O arquivo `main.py` tem como objetivo, além das definições de métodos e importações supracitadas, **executar um *loop* iterativo, para que o usuário possa, através das funções de linha de comando, definir as ações do sistema de automação**. É importante destacar que, uma vez que o arquivo `main.py` é o arquivo principal para o funcionamento do projeto, diversas funções e valores que aqui aparecem **não necessariamente são gerados neste arquivo**, uma vez que há a importação de funções advindas de outros arquivos (como `cli_functions.py` e `robot_functions.py`, por exemplo). Para completude do objetivo do atual sistema de automação, portanto, a lógica abaixo permite o controle do sistema por parte do usuário. Avalia-se o código por partes:

```python
while True:
    welcome_screen()
    result = terminal_start(pydobot)

    if 'port' in result:
        port = result['port']
        device = InteliDobot(port=port, verbose=False)

    action = result['action']
```

&emsp;&emsp; Primeiro, inicia-se um *loop* infinito através da condicional `while True`, que executa a função `welcome_screen`, de origem em `cli_functions.py`, sendo a tela de boas-vindas ao usuário em nossa CLI. Após, a variável `result` recebe o valor resultante da função `terminal_start`, que diz respeito à ação do usuário em nossa CLI e que, posteriormente, nos aprofundaremos no funcionamento.

&emsp;&emsp; A seguir, avalia-se a presença do termo 'port' na variável `result`. Caso positivo, salva o valor vinculado ao termo 'port' em `result` na variável `port`, e a utiliza como parâmetro de criação da instância `device` da classe `InteliDobot`. Por último, define-se a variável `action` como o valor resultante do termo `action` em `result`.

&emsp;&emsp; O código a seguir, por sua vez, é responsável por comparar o valor de `action` às funções pré definidas em `cli_functions.py`.

#### Ação de coleta:

```python
    if action == "collect":
        port = result['port']
        bins = result['bins']
        device.suck(False)
        return_home(device, positions)
        
        for bin in bins:
            move_to_bin(device, positions, bin, 0, bins[bin])

        if not (loop := return_to_menu()):
            break
```
&emsp;&emsp; Após comparação do valor de `action`, define `ports` e `bins` com valores retornados da CLI e itera sobre a quantidade de bins escolhidas pelo usuário, definindo, através da função `move_to_bin`, advinda de `robot_functions.py`, quais bins o robô deve realizar a coleta. Por fim, define-se o retorno do usuário ao menu de opções do CLI através da comparação `if not (loop := return_to_menu())`, que atribui o valor de retorno de `return_to_menu` para a variável `loop` e, caso seja negativo, encerra o *loop* da CLI.

#### Ação de retorno para home:

```python
    elif action == "home":
        port = result['port']
        return_home(device, positions)
        console.print("[green]Robô retornou para a posição inicial com sucesso![/green]")
        if not (loop := return_to_menu()):
            break
```
&emsp;&emsp; Caso a ação do usuário retorne 'home', executa a função `return_home`, definida em `robot_functions.py`, para que o braço robótico retorne a sua posição de referência. Novamente, compara se o usuário deseja retornar ao menu.

#### Ação de posicionamento atual
```python
    elif action == "current_pos":
        port = result['port']
        (x, y, z, r, j1, j2, j3, j4) = device.pose()
        console.print(
            Panel(
                f"Posição atual do robô:\n"
                f"x: {x}\ny: {y}\nz: {z}\nj1: {j1}\nj2: {j2}\nj3: {j3}\nj4: {j4}",
                title="Posição Atual",
                border_style="blue"
            )
        )

        if not (loop := return_to_menu()):
            break
```
&emsp;&emsp; Com a escolha do usuário por visualizar a posição atual do braço robótico, utiliza-se da função `device.pose`, sendo `device` a instância criada da classe `InteliDobot`, para retornar e atribuir às variáveis definidas na tupla `(x, y, z, r, j1, j2, j3, j4)`, as coordenadas atuais do `Magician Lite`. Por fim, apresenta-se as coordenadas em um painel estilizado através da biblioteca `rich`. Por fim, compara o retorno do usuário ao menu.

#### Checagem das coordenadas dos remédios
```python
    elif action == "check_bins":
        console.print("[bold]Coordenadas das Bins:[/bold]")
        for remedio in positions["bins"]:
            console.print(
                Panel(
                    f"Remédio: {remedio}\n"
                    f"Coordenada X: {positions['bins'][remedio]['pos_x']}\n"
                    f"Coordenada Y: {positions['bins'][remedio]['pos_y']}\n"
                    f"Coordenada Z: {positions['bins'][remedio]['pos_z']}",
                    title=f"Bin: {remedio}",
                    
                    border_style="magenta"
                )
            )
            
        if not (loop := return_to_menu()):
            break
```
&emsp;&emsp; Caso o usuário deseje visualizar as coordenadas X, Y e Z dos bins vinculados à cada medicamento previamente cadastrado, apresenta-se um painel contendo as informações dos remédios e suas respectivas coordenadas. Finalmente, retorna o usuário ao menu caso o deseje.

#### Chegagem de portas seriais disponíveis
```python
    elif action == "ports":
        port = test_port(pydobot)
        console.print(f"[green]Sua porta [bold]{port}[/bold] está pronta para uso![/green]")

        if not (loop := return_to_menu()):
            break
```
&emsp;&emsp; Finalmente, o retorno da escolha do usuário como 'ports', vinculada à escolha da checagem de portas de uso, permite a execução da função `test_ports`, definida em `cli_functions.py`, que retorna a porta serial disponível para ser utilizada para controle do braço robótico. A apresentação visual da porta é feita através da biblioteca `rich` e, por fim, compara se o usuário deseja retornar ao menu.

#### Sair do terminal
```python
    elif action == "exit":
        console.print("[red]Saindo do programa...[/red]")
        break
```
&emsp;&emsp; Por fim, o código acima compara se a escolha do usuário foi de saída do terminal e encerra o CLI caso seja.

---

### 2.3. Arquivo `robot_functions.py`

&emsp; O arquivo `robot_functions.py` é responsável por **definir funções relacionadas ao `Magician Lite`, como movimentação e captação de coordenadas**. 

```python

from rich.console import Console
from rich.panel import Panel

```
#### `move_to_bin()`:

```python
def move_to_bin(device, positions, drug, r, iter):
    if drug not in positions['bins']:
        raise ValueError(f"{drug} não encontrada!")

    counter = 0

    # Loop de iteração sobre a quantidade de coletas na mesma bin
    while counter < int(iter):
        
        console.print(
            Panel
            (
                f"[bold cyan]Buscando {drug}...[/bold cyan]"
            )
        )

        # Move o sugador para as posições da bin especificada
        device.movej_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            positions['bins'][drug]['pos_z'],
            r,
            wait=True
        )

        console.print(
            (
                f"[bold yellow] ▪️ Movimento para {drug}[/bold yellow]\n"
            )
        )
        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            18,
            r,
            wait=True
        )

        # Ativa a sucção do bico sugador
        console.print(
            (
                "[bold yellow] ▪️ Ativando bico sugador[/bold yellow]\n"
            )   
        )
        device.suck(True)

        device.movel_to(
            positions['bins'][drug]['pos_x'],
            positions['bins'][drug]['pos_y'],
            120,
            r,
            wait=True
        )

        # Move o sugador para a posição de referência home
        console.print(
            (
                "[bold yellow] ▪️ Retornando para ponto de referência[/bold yellow]\n"
            )
        )
        
        return_home(device, positions)
        
        console.print(
            (
                "[bold yellow] ▪️ Movimento para o dispenser[/bold yellow]\n"
            )
        )
        
        device.movej_to(
            positions['presets']['dispenser']['pos_x'],
            positions['presets']['dispenser']['pos_y'],
            positions['presets']['dispenser']['pos_z'],
            r,
            wait=True
        )
        
        # Desativa a sucção do bico sugador
        console.print(
            Panel
            (
                f"[bold green]✔ {drug} coletado![/bold green]\n"
            )
        )
        device.suck(False)

        # Retorna o sugador para a posição de referência home
        return_home(device, positions)

        # Adiciona unidade ao iterador
        counter += 1
```
&emsp;&emsp;**Funcionalidade:** A função `move_to_bin` recebe parâmetros de identificação do `Magician Lite` em `device`, as posições das bins em `positions`, o remédio a ser buscado em `drug`, a rotação da ponta de atuação do braço robótico em `r` e, por fim, a quantidade de vezes que o mesmo remédio será coletado em `iter`.

&emsp;&emsp;**Método de atuação:** `move_to_bin` é executada *n* vezes de acordo com o valor de iteração `iter` atribuído em seus parâmetros. Portanto, o arquivo é iniciado com um comparador `while counter < int(iter)`, que executará o código enquanto o valor do contador `counter` for menor do que a quantidade de iterações de `iter`. Seguindo para o código, temos uma **sequência de movimentos padrões à todas as coletas**, independentemente do remédio a ser coletado. As movimentações do `Magician Lite` aqui definidas recorrem aos métodos definidos em `main.py`, como `movej_to` e `movel_to`. Após um movimento do robô, utiliza-se painéis estilizados da biblioteca `Rich` para registrar as ações do braço robótico. O método `device.suck` é utilizado para ativar ou desativar o bico de sucção na ponta de atuação do braço robótico.

&emsp;&emsp; Após testes de movimentação, velocidade e segurança na coleta dos medicamentos pelo *PharmaBot*, o grupo *PharmaTech* decidiu padronizar a movimentação do robô para todos os remédios a serem coletados. Portanto, a sequência de movimentações do braço robótico é destacada abaixo:
1) O braço robótico se movimenta à bin escolhida;
2) A ponta de atuação do braço robótico descende sua posição no eixo z;
3) O bico de sucção é ativado;
4) A ponta de atuação do braço robótico ascende sua posição no eixo z;
5) O braço robótico se movimenta às coordenadas da posição de referência home;
6) O braço robótico se movimenta às coordenadas da posição de dispenser;
7) O bico de sucção é desativado;
8) O braço robótico se movimenta às coordenadas da posição de referência home.

#### `return_home()`:

```python
def return_home(device, positions: dict):
    device.movej_to(
        positions['presets']['home']['pos_x'],
        positions['presets']['home']['pos_y'],
        positions['presets']['home']['pos_z'],
        0,
        wait=True
    )
```

&emsp;&emsp; A função `return_home` utiliza do método `movej_to` para retornar a posição `home` de referência.

#### `get_current_position()`:
```python
def get_current_position(device):
    pos = device.pose()
    return {"x": pos[0], "y": pos[1], "z": pos[2]}
```

&emsp;&emsp;A função `get_current_position` é utilizada para coletar as atuais coordenadas do braço robótico, retornando um dicionário com as posições x, y e z.

---

### 2.4. Arquivo `cli_functions.py`

&emsp; O arquivo `cli_functions.py` contém as funções responsáveis pela interface de linha de comando (*Command Line Interface* - CLI) do sistema de automação. Esse arquivo é utilizado pelo `main.py` para permitir que o usuário interaja com o sistema, escolhendo ações e visualizando informações sobre o braço robótico.

&emsp; O `cli_functions.py` importa as bibliotecas necessárias para exibição de mensagens e menus interativos:

```python
import inquirer
from rich.console import Console
from rich.panel import Panel
from yaspin import yaspin
from serial.tools import list_ports
```

&emsp; A biblioteca `inquirer` é utilizada para criar perguntas interativas no terminal, enquanto `rich.console` e `rich.panel` permitem a exibição formatada das mensagens na interface. A biblioteca `yaspin` adiciona animações de carregamento, e `serial.tools.list_ports` permite a listagem de portas seriais disponíveis para conexão com o braço robótico.

#### `welcome_screen()`

```python
def welcome_screen():
    console.clear()
    console.print(Panel("[bold cyan]Bem-vindo(a) ao terminal de acesso ao PharmaBot![/bold cyan]", expand=False))
```

&emsp;&emsp;**Funcionalidade:** A função `welcome_screen` exibe uma tela de boas-vindas estilizada utilizando a biblioteca Rich. Limpa-se o terminal antes da exibição para garantir melhor visualização pelo usuário.

#### `main_menu()`

```python
def main_menu():
    questions = [
        inquirer.List(
            "action",
            message="O que gostaria de realizar?",
            choices=[
                "1 - Separação de fita de medicamentos",
                "2 - Retornar para home",
                "3 - Visualização da posição atual",
                "4 - Checagem das posições das bins",
                "5 - Portas de conexão",
                "6 - Sair"
            ],
            carousel=True
        )
    ]
    answer = inquirer.prompt(questions)["action"]
    return answer
```

&emsp;&emsp;**Funcionalidade:** Na função `main_menu` se encontra o menu principal com as opções de ações que o usuário pode escolher. Utiliza-se a biblioteca `inquirer` para permitir uma interação fácil e amigável com o usuário via CLI. O menu apresenta 6 opções de escolha ao usuário, sendo o retorno da função, a seleção de opção pelo usuário.

#### `test_port()`

```python
def test_port(pydobot):
    ports = available_ports()  
    if not ports:
        console.print("[bold orange]Nenhuma porta serial encontrada. Conecte o Dobot e tente novamente.[/bold orange]")
        return
    
    for port in ports:
        console.print("[green]Testando portas de comunicação...[/green]")
        try:
            device = pydobot.Dobot(port=port, verbose=False)
            device.close()
            return port
        except Exception as e:
            console.print("[bold red] Não foi possível conectar na porta[/bold red]")
```

&emsp;&emsp;**Funcionalidade:** A função `test_port()` verifica as portas seriais disponíveis e testa a comunicação com o braço robótico. Utiliza-se `available_ports()` para buscar todas as portas seriais disponíveis. Caso nenhuma porta seja encontrada, exibe uma mensagem de erro e retorna `None`. Caso uma porta seja bem sucedida na comunicação, a função retorna a porta. 

#### `remedy_collection()`

```python
def remedy_collection(pydobot):  
    # Seleção das bins
    questions = [
        inquirer.Checkbox(
            'bins',
            message="Qual(is) bin(s) deseja coletar?",
            choices=['Dipirona', 'Flogoral', 'Cetopronazol', 'Buscopan', 'Neosalgina'],
            carousel=True
        )
    ]
    console.print("[yellow]Dica: utilize ↑, ↓ e [bold]barra de espaço[/bold] para selecionar suas opções![/yellow]\n")
    console.print("[yellow]Dica: utilize ENTER para confirmar sua escolha.[/yellow]\n")
    selected_bins = inquirer.prompt(questions)["bins"]

    # Input de quantidades
    bin_quantities = {}
    for bin in selected_bins:
        question = [
            inquirer.Text(
                bin,
                message=f"Quantos {bin} deseja coletar?",
                validate=lambda _, x: x.isdigit() and int(x) > 0
            )
        ]
        quantity = inquirer.prompt(question)[bin]
        bin_quantities[bin] = int(quantity)
    
    # Seleção da porta disponível
    port = test_port(pydobot)
    return {"port": port, "bins": bin_quantities}
```

&emsp;&emsp;**Funcionalidades:** A função `remedy_collection` tem como objetivo apresentar um *checklist* para o usuário escolher quais remédios deseja coletar através do braço robótico, definido em `inquirer.Checkbox()`. Além disso, imprime no terminal algumas dicas para facilitar a navegação do usuário pelo terminal. Após a escolha dos remédios a serem coletados, requer que o usuário adicione quantos remédios de cada escolha deseja coletar (validando se o *input* pelo usuário é um dígito e maior que 0). Finalmente, retorna quais remédios, sua quantidade e em qual porta de comunicação controlar o braço robótico.

#### `available_ports()`:

```python
def available_ports():
    serial_ports = list_ports.comports()
    available_ports = [x.device for x in serial_ports]
    return available_ports if available_ports else ["Nenhuma porta disponível"]
```

&emsp;&emsp;**Funcionalidade:** Retorna uma lista de portas disponíveis para comunicação serial com o dispositivo do usuário através de `list_ports.comports()`. Caso não haja portas disponíveis, retorna um texto informativo.

#### `return_to_menu()`

```python
def return_to_menu():
    """Pergunta se o usuário deseja retornar ao menu principal."""
    question = [
        inquirer.List(
            "return_menu",
            message="Deseja retornar ao menu de escolhas?",
            choices=["Sim", "Não"],
            carousel=True
        )
    ]
    answer = inquirer.prompt(question)["return_menu"]
    if answer == "Sim":
        console.clear()
        return True
    else:
        console.print("[bold red]Encerrando o terminal.[/bold red]")
        return False

```

&emsp;&emsp;**Funcionalidade:** Apresenta ao usuário uma lista de sim ou não perguntando ao usuário se o mesmo deseja retornar ao menu principal. A função retorna `True` caso o usuário escolha 'Sim' e `False` caso o usuário escolha 'Não'.

#### `terminal_start()`

```python
def terminal_start(pydobot):
    action = main_menu()
    console.print("\n[bold yellow]→ Opção escolhida:[/bold yellow]", action, "\n")

    if "1" in action:
        loading_effect("Iniciando separação de fita de medicamentos...\n")
        port_bin = remedy_collection(pydobot)
        port = port_bin['port']
        bin_quantities = port_bin['bins']
        return {"action": "collect", "port": port, "bins": bin_quantities}

    elif "2" in action:
        port = test_port(pydobot)
        loading_effect("Retornando para home...\n")
        return {"action": "home", "port": port}

    elif "3" in action:
        loading_effect("Obtendo posição atual do PharmaBot...\n")
        port = test_port(pydobot)
        return {"action": "current_pos", "port": port}

    elif "4" in action:
        loading_effect("Checando posições das bins...\n")
        return {"action": "check_bins"}

    elif "5" in action:
        loading_effect("Checando portas disponíveis...\n")
        ports = available_ports()
        return {"action": "ports", "ports": ports}

    elif "6" in action:
        console.print("[bold red]Encerrando o terminal.[/bold red]")
        return {"action": "exit"}
```

&emsp;&emsp; A função `terminal_start` visa iniciar a lógica de coleta das opções do usuário, para posterior integração com as funções do robô descritas na seção [`robot_functions.py`](#22-arquivo-robot_functionspy). A função, portanto, compara o índice presente na `string` retornada de `main_menu` e retorna uma sequência de informações de acordo com os dados necessários para realização de cada ação.

&emsp;&emsp; Por exemplo: caso o usuário decida separar os medicamentos, ele seleciona a opção 1 de `main_menu`, que por sua vez, retorna '1' e `terminal_start` registra o valor retornado de `main_menu` na variável `action`. Após a comparação, o retorno de `remedy_collection` é salvo em `port` e, por fim, é incluído, dentre outros valores, no retorno da função `terminal_start`. Estes retornos serão utilizados em `main.py` para definição de quais funções do robô serem ativadas.

---

### 2.5. Arquivo `positions.json`

&emsp; O arquivo `positions.json` possui uma estrutura de dados `json` que retém informações das coordenadas de alguns pontos de referência para o atual funcionamento do sistema de automação. As informações são separadas em `bins` e `presets`.

```json
{
  "bins":{
    "Dipirona": {
      "pos_x": 273.20233154296875,
      "pos_y": 144.26193237304688,
      "pos_z": 120.0
    },
    "Flogoral": {
      "pos_x": 275.34912109375,
      "pos_y": 69.3950424194336,
      "pos_z": 120.0
    },
    "Cetopronazol": {
      "pos_x": 277.5692443847656,
      "pos_y": -8.155553817749023,
      "pos_z": 120.0
    },
    "Buscopan": {
      "pos_x": 272.8912658691406,
      "pos_y": -78.71314239501953,
      "pos_z": 120.0
    },
    "Neosalgina": {
      "pos_x": 271.8085632324219,
      "pos_y": -146.62448120117188,
      "pos_z": 120.0
    }
  },
  "presets":{
    "dispenser": {
      "pos_x": 0,
      "pos_y": -300,
      "pos_z": 15
    },
    "home": {
      "pos_x": 242.9496307373047,
      "pos_y": 1.9463245868682861,
      "pos_z": 147
    }
  }
}
```

- Bins: São definidas as coordenadas x, y e z das bins de acordo com o nome do remédio.

- Presets: São definidas as coordenadas x, y e z de posições importantes para o funcionamento do sistema, como um ponto de referência `home` e `dispenser`, para a liberação de medicamentos.

---

## 3. Comandos

&emsp; Segue abaixo os comandos disponíveis para o braço robótico e suas respectivas funções.

- **Separação de fita de medicamentos:** Separa os medicamentos da fita que foram configurados;

- **Retornar para home:** Retorna a posição inicial configurada para o robô;

- **Visualização da posição atual:** Exibe a posição que o robô se encontra;

- **Checagem das posições das bins:** Verifica as posições dos bins;

- **Sair:** Encerra o funcionamento do braço robótico;

## Demonstração

<div align="center" width="100%">

<sub>Vídeo 1 - Funcionamento Atual do Sistema</sub>

<iframe width="560" height="315" src="https://www.youtube.com/embed/u1MBkP50Yxs?si=Su3Xpmw6FsNMHThp&start=30&end=61" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br/>
<sup>Fonte: Autoria própria </sup>

</div>

&emsp; No vídeo acima, é possível observar o funcionamento completo do sistema. No trecho selecionado, destaca-se sua funcionalidade principal: a capacidade de separação. 

:::info[Informação]

Para pegar um remédio, o robô:
1. Vai até o remédio selecionado; 
2. ativa o sugador;
3. vai até a _home_ (sua posição de segurança);
4. vai até a caixa;
5. Desativa o sugador.

Isso pode ser visto mais detalhadamente no vídeo abaixo.

<div align="center" width="100%">

<sub>Vídeo 2 - Pegando objetos</sub>

<iframe width="560" height="315" src="https://www.youtube.com/embed/J8xou-9RjOY?si=RRpN7-qtF0MhDWuV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br/>
<sup>Fonte: Autoria própria </sup>

</div>

:::

&emsp; Observa-se, portanto, que é possível carregar pontos pré-definidos para o robô, que, no caso dos remédios demonstrados, estavam armazenados no arquivo  _[`positions.json`](../../../../src/robot/positions.json)_. Além disso, vê-se a capacidade de fazer o robô navegar e segurar objetos. Entretanto, atualmente, o robô não conta com periféricos como um sensor infravermelho -  capaz de realizar a checagem de que ele pegou algo - e nem com um leitor de código de barras - capaz de verificar o remédio pego. Essas funcionalidades serão desenvolvidas na próxima sprint.

📌 Para assistir ao vídeo completo, clique aqui.


:::tip[Dica]

Para checar detalhadamente o terminal de acesso do PharmaBot e as demais funções de visualização de estado do sistema, como checagem das posições das bins, veja o vídeo abaixo.

<div align="center" width="100%">

<sub>Vídeo 3 - CLI</sub>
<br/>
<iframe width="560" height="315" src="https://www.youtube.com/embed/B-lQuKAQ_r8?si=WJC4AhIxwZwt9Gyh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br/>
<sup>Fonte: Autoria própria </sup>

</div>

:::