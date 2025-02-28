# Inicialização da CLI

&emsp; A sigla em inglês *Command-Line Interface (CLI)*, significa Interfase De Linha De Comando. Nesse sentido, ela representa um programa funcionando através de linhas de comando, que aceita entrada de texto para executar funçãoes da aplicação, neste caso, os comandos para o funcionando do braço robótico.

## 1° Passo: Instalar e a ativar venv 

&emsp; Primeiro, abra um terminal e digite o seguinte comando para entrar na pasta necessária.

```bash
    cd scr/robot
```
&emsp; Em seguida, digite o seguinte comando para instalar o venv

**Para Windows**
```bash
    python -m venv nome-do-venv
```

**Para Linux**
```bash
    python3 -m venv .venv
```

&emsp; Por fim, digite o seguinte comando para ativar o venv

**Para Windows**

```bash
    nome-do-venv\Scripts\activate
```
**Para Linux**

```bash
    source ./.venv/bin/activate
```
## 2° Passo: Instalar as bibliotecas externas

&emsp; Primeiro, digite os seguintes comandos para baixar as bibliotecas

**Para Windows**

```bash
    pip install -f requirements.txt
```

**Para Linux**

```bash
    pip3 install -f requirements.txt
```

## 3° Passo: Executar a aplicação

&emsp; Primeiro, digite o seguinte comando para entrar na página do código

```bash
    cd scr/robot
```

&emsp; Em seguida, digite o seguinte comando para executar a aplicação

**Para Windows**

```bash
    python main.py
```

**Para Linux**

```bash
    python3 main.py
```

## 4° Passo: Escolher o comando a ser executado pelo braço robótico 

&emsp; Ao executar o *main.py* serão expostas seis opções de ação para o braço robótico, exibidas a seguir. Assim, é possível escolher uma ação com a tecla de *enter*.

1. Separação de fita de medicamentos
2. Retornar para home
3. Visualização da posição atual
4. Checagem das posições das bins
5. Portas de conexão
6. Sair


