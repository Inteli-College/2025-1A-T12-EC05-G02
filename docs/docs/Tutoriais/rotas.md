---
sidebar_position: 2
slug: /sprint-3/integracao/rotas
---

# Autenticação de rotas

Este tutorial, explica como utilizar as funções de autenticação de rotas através do  backend, principalmente para os desenvolvedores do projeto responsáveis por tarefas relacionadas ao back-end.

## Instalação e importação das bibliotecas necessárias

Para que a autenticação baseada em cargos funcione, você vai precisar de duas funções, que pertencem a bibliotecas diferentes. A primeira é uma biblioteca externa chamada `flask_jwt_extended`, e primeiro você deve instalar ela no terminal.
Para garantir que você vai ter tanto a biblioteca `flask_jwt_extended` quanto todas as outras instaladas e atualizadas, basta rodar o seguinte comando no terminal (lembre-se de estar na pasta back-end do projeto):

> Windows
```shell
pip install -r requirements.txt
```

> Linux e Macos
```shell
pip3 install -r requirements.txt
```

A segunda biblioteca é local, e está localizada na pasta `decorators` e no arquivo `route_auth`, logo, não é necessário instalar separadamente.

Após isso, você deve importar a função `role_required` da biblioteca `decorators` do arquivo `route_auth`, e deve importar a função `jwt_required` da biblioteca `flask_jwt_extended`:

```python
from decorators.route_auth import role_required
from flask_jwt_extended import jwt_required
```

### Casos de uso

1. **Rota acessível para qualquer usuário do sistema**:
 
Neste caso, qualquer pessoa pode fazer requisições para a rota, dispensando a necessidade de qualquer forma de autenticação ou de verificação. Um exemplo de rota que se utiliza desse caso de uso, é a rota de login, pois ela deve ser acessível para qualquer usuário, mesmo aqueles sem autenticação, uma vez que é através dela que a autenticação deve ser feita.

```python
@usersFlask.route('/login', methods=['POST'])
def login():
    # Código da função...
```

Basta deixar a rota da mesma forma original, não são necessárias alterações adicionais.

---

2. **Rota acessível apenas a usuários que fizeram o login**:

Neste caso, a rota se torna acessível para qualquer usuário que tenha feito login em sua conta. É válido pontuar que, esse caso não faz distinção de cargos, logo qualquer usuário autenticado, independente do cargo possui a capacidade de 

```python
@usersFlask.route('/login', methods=['POST'])
@jwt_required() # Exige login
def login():
    # Código da função...
```

Após a declaração da rota, basta adicionar a função `@jwt_required()`. Essa função bloqueia requisições feitas por usuários não autenticados (logados), porém é válido relembrar que qualquer usuário autenticado, independente do cargo, vai poder fazer requisições para essa rota.

---

3. **Rota acessível apenas a usuários que fizeram o login e possuem um cargo específico**:

```python
@usersFlask.route('/login', methods=['POST'])
@jwt_required() # Exige login
@role_required('admin') # Exige login em um usuário com o cargo 'admin'
def login():
    # Código da função...
```

Além da função `@jwt_required()` você vai utilizar a função `@role_required()`, passando como parâmetro o nome do cargo que vai ter acesso a essa rota, que no nosso caso, o nome do cargo é `admin`, indicando que apenas o administrador vai ter permissão para fazer requisições para essa rota.