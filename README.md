# 2025-1A-T12-EC05-G02

# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

##  PHARMATECH

## Inicialização da documentação no docsaurus
Docusaurus é um gerador de sites estáticos criado pelo Facebook para documentação técnica. Permite publicar conteúdo facilmente, com navegação clara e responsiva.Sendo assim, para inicializa-lo e ter acesso a documentação *Pharmatech*.

Siga os passos abaixo para inicializar o servidor local da documentação do projeto utilizando Docusaurus:

# Pré-requisitos
* Node.js (versão recomendada: 18.x ou superior)
* npm ou Yarn (gerenciador de pacotes)

Verifique se estão instalados corretamente executando:
```python
node -v
npm -v # ou yarn -v

```
# Instalação das Dependências
No terminal, navegue até a pasta raiz da documentação e instale as dependências com o comando abaixo:

```python
npm install

```

# Executando a Documentação Localmente
Para executar o servidor local da documentação, utilize o comando:

```
npm run start
```

# Acessando a Documentação
Após inicializado, acesse a documentação abrindo seu navegador em:
```
http://localhost:3000
``
## Guia da inicialização da CLI

&emsp; A sigla em inglês *Command-Line Interface (CLI)*, significa Interfase De Linha De Comando. Nesse sentido, ela representa um programa funcionando através de linhas de comando, que aceita entrada de texto para executar funçãoes da aplicação, neste caso, os comandos para o funcionando do braço robótico.

### 1° Passo: Instalar e a ativar venv 

&emsp; Primeiro, abra um terminal e digite o seguinte comando para entrar na pasta necessária.

```bash
    cd src/robot
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
### 2° Passo: Instalar as bibliotecas externas

&emsp; Primeiro, digite os seguintes comandos para baixar as bibliotecas

**Para Windows**

```bash
    pip install -f requirements.txt
```

**Para Linux**

```bash
    pip3 install -f requirements.txt
```

### 3° Passo: Executar a aplicação

&emsp; Primeiro, digite o seguinte comando para entrar na página do código

```bash
    cd src/robot
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

### 4° Passo: Escolher o comando a ser executado pelo braço robótico 

&emsp; Ao executar o *main.py* serão expostas seis opções de ação para o braço robótico, exibidas a seguir. Assim, é possível escolher uma ação com a tecla de *enter*.

1. Separação de fita de medicamentos
2. Retornar para home
3. Visualização da posição atual
4. Checagem das posições das bins
5. Portas de conexão
6. Sair

## Guia de Inicialização do frontend local

### 1° Passo: Entrar no diretório do projeto

&emsp;Primeiro, abra um terminal e digite o seguinte comando para entrar na pasta do frontend.

```bash
cd src/frontend/pharmabot
```

### 2° Passo: Instalar as dependências

&emsp;Em seguida, instale as dependências do projeto com o seguinte comando:

```bash
npm install
```
### 3° Passo: Executar a aplicação

 &emsp;Para iniciar o servidor local do frontend, execute o seguinte comando:

```bash
npm run dev
```
&emsp;Após a execução, o terminal exibirá o link onde a aplicação estará rodando, geralmente http://localhost:3000/. Basta abrir o navegador e acessar o link para visualizar a aplicação em funcionamento.
