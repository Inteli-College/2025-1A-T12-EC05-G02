
# Documentação do código

&emsp; Durante o desenvolvimento do segunda sprint, implementou-se um sistema básico de automação, no qual foi desenvolvido uma interface por linha de comando para trocar informações com o braço de robótico. Nesse sentido, abaixo são apresentados as tecnologias que foram utilizadas, como o modelo do braço robótico e as bibliotecas externas, além de uma breve explicação sobre as funcionalidades de cada arquivo e os comandos que o braço robótico é capaz de executar. Portanto, a presente documentação tem como objetivo facilitar o entendimento do funcionamento do robô, além disso, ao final expõem-se o vídeo que exemflifica tal operação.

&emsp; A guia para a inicialização da CLI pode ser acessada pelo seguinte _[link](../Sistema%20de%20Automação/InicializaçãoDaCLI.md)_

## 1. Tecnologias utilizadas

### 1.1. [Dobot Magician Lite](https://minipa.com.br/images/Manual/Magician-Lite-1101-BR.pdf)

&emsp; O Magician Lite é um braço robótico multifuncional voltado para a educação de treinamento prático. Nesse sentido, o robô apresenta uma capacidade de carga de 250g, possui quatro eixos e apresenta um alcance máximo de 340mm. Além disso, o Dobot oferece um controlador externo denominado “Magic Box”, o qual separa o algoritmo de controle de movimentação e as tarefas do usuário para permitir maior conveniência de programação e criação. Porém, decidiu-se utilizar o microcontrolador Raspberry Pi 5 por conta da possibilidade de comunicação via Wi-Fi, assim, o braço robótico consegue receber comandos sem estar conectado via cabo, o que não era possível através da Magic Box. Por fim, os usuários podem expandir uma ampla linha de sensores e acessórios relacionados para obter mais possibilidades.

### 1.2. Bibliotecas

- **Pydobot:** Essa biblioteca foi desenvolvida com o objetivo de simplificar o controle do Dobot Magician Lite, dessa forma, ele permite o envio de comandos ao robô para movimentação, controle de acessórios e leitura de sensores.

- **Inquirer:** Essa biblioteca é utilizada para criar consultas interativos no terminal, exibindo resultados de forma estruturada para facilitar a visualização e análise de dados.

- **Yaspin:** Essa biblioteca é utilizada para exibir os spinners, ou seja, indicadores visuais usados para mostrar que um processo está em andamento, pelo terminal de forma simples e personalizável. 

## 2. Estrutura de pastas e arquivos

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

### Robot
- _[`cli_functions.py:`](../../../../src/robot/cli/cli_functions.py)_ Este arquivo implementa um terminal interativo para o controle do braço robótico.  

- _[`main.py:`](../../../../src/robot/main.py)_Este arquivo inicializa o funcionamento do braço robótico

- _[`positions.json:`](../../../../src/robot/positions.json)_ Este arquivo armazena as coordenadas em x, y, e z dos medicamentos

- _[`requirements.txt:`](../../../../src/robot/requirements.txt)_ Este arquivo armazena as dependências do presente projeto em python, especificando os pacotes necessários e suas versões. 

- _[`robot_functions.py`](../../../../src/robot/robot_functions.py)_ Este arquivo armazena as funções de movimentação do robô Dobot Magician Lite.

## 3. Comandos

&emsp; Segue abaixo os comandos disponíveis para o braço robótico e, em seguida, um vídeo demostrativo.

- **Separação de fita de medicamentos:** Separa os medicamentos da fita que foram configurados;

- **Retornar para home:** Retorna a posição inicial configurada para o robô;

- **Visualização da posição atual:** Exibe a posição que o robô se encontra;

- **Checagem das posições das bins:** Verifica as posições dos bins;

- **Sair:** Encerra o funcionamento do braço robótico;
