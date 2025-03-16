---
sidebar_position: 1
slug: /Tutoriais/API
---

# API - Application Programming Interface

A API do projeto, consiste no sistema que roda "por debaixo dos panos", responsável por validar e lidar com todas as requisições do Front-End da aplicação e da comunicação com a API do 

Antes de implementar e testar a API, recomendo ler as seguintes seções da documentação para melhor entendimento teórico da tecnologia:

- [Arquitetura da API](docs/Sprint-2/API/arquitetura-api.md)
- [Endpoints da API](docs/Sprint-2/API/endpoints.md)

Além disso, é válido mencionar que esse tutorial considera que você possui as seguintes ferramentas e tecnologias instaladas no seu computador:
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Python](https://www.python.org/)

### Instruções para a leitura do tutorial

O tutorial é separado em tópicos, em uma lista com ordem numérica, como no exemplo a seguir:
1. Tópico X

*Explicação sobre o tópico*

```python
# Snippet de código ou do terminal
```

---

Sobre os snippets de código, caso ele não tenha nenhuma descrição, significa que o mesmo comando pode ser executado em todos os sistemas operacionais (Windows, Linux e Macos)
No exemplo a seguir, não existe descrição, logo o comando funciona em qualquer terminal

```shell
# Snippet de código ou do terminal
```

Neste outro exemplo, são separados dois snippets, um que só pode ser executado no Windows e o outro que só pode ser executado no Linux e no Macos. 

> Windows
```shell
# Snippet de código ou do terminal
```

> Linux e Macos
```shell
# Snippet de código ou do terminal
```


Lembrando que os scripts, mesmo com sintaxes diferentes, executam os mesmos processos e fazem as mesmas ações independente do sistema operacional

---

## Como executar a API localmente?

1. **Clonar o repositório**

Para clonar o repositório, basta abrir o terminal, ir até a pasta que você deseja armazenar o repositório e executar o seguinte comando:

```shell
git clone https://github.com/Inteli-College/2025-1A-T12-EC05-G02.git
```

E entre na pasta root do repositório:

```shell
cd /2025-1A-T12-EC05-G02
```

---

2. **Criar e executar um ambiente virtual**

O ambiente virtual é importante para conseguir ter melhor controle das dependências do projeto e evitar conflitos entre pacotes.

Considerando que você está no root do repositório, vá até a pasta `/back-end`:

```shell
cd /src/backend
```

Agora, você, dentro da sua caixola, deve pensar em um nome para o seu ambiente virtual!
Porém, nesse tutorial vou dar o nome de `.venv` para o ambiente virtual pois é o nome padrão, mas você pode dar o nome que desejar.

Para criar um ambiente virtual em Python, basta executar o seguinte comando no terminal:

> Windows
```shell
python -m venv .venv
```

> Linux e Macos
```shell
python3 -m venv .venv
```

Agora que o seu ambiente virtual está criado, é preciso executá-lo:

> Windows
```shell
.\.venv\Scripts\activate
```

> Linux e Macos
```shell
source .venv/bin/activate
```

Agora seu ambiente virtual está criado e sendo executado, (em um mundo ideal) garantindo que você não tenha mais problemas com depências e suas versões.

> 🚨  **IMPORTANTE!**  🚨
> A pasta do ambiente virtual nunca deve ser adicionada ao github, o ambiente virtual serve exclusivamente para facilitar a execução do projeto de forma local no seu computador.
> Logo, você deve adicionar o nome do seu ambiente virtual ao arquivo `.gitignore` do seu projeto. Todo arquivo ou pasta adicionado ao git ignore é ignorado pelo git no momento de adicionar suas modificações ao repositório.
> Para fazer isso, basta abrir o arquivo `.gitignore` e colocar o nome do seu ambiente virtual em uma nova linha, no meu caso: `.venv`

---

3. **Instalar as bibliotecas, pacotes e dependências**

Para instalar as bibliotecas e dependências do projeto, basta executar o seguinte comando:

```shell
pip install -r requirements.txt
```

Na pasta do projeto, existe um arquivo chamado `requirements.txt`, que é um arquivo de texto que armazena o nome e a versão de todas as bibliotecas utilizadas no projeto. O comando basicamente instala cada uma das dependências na versão informada.

> **Observação:** As vezes no Linux ou no Macos talvez você tenha que trocar o a palavra `pip` por `pip3`

---

4. **Executar o projeto**

Para executar o projeto, execute o seguinte comando:

> Windows
```shell
python main.py
```
> Linux e Macos
```shell
python3 main.py
```

Dessa forma, após a execução da API de forma local, seu terminal deve se parecer com isso:

```shell
(.venv) C:\Users\Inteli\Desktop\2025-1A-T12-EC05-G02\src\backend>python main.py
INFO:werkzeug: * Restarting with stat
WARNING:werkzeug: * Debugger is active!
INFO:werkzeug: * Debugger PIN: 521-537-772
(20416) wsgi starting up on http://0.0.0.0:5555
```

E pronto! Sua API está rodando e funcionando, agora basta fazer as requisições para as rotas disponíveis, utilizando a URL mostrada no terminal, que, no meu caso é `http://0.0.0.0:5555`
