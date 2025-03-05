# Endpoints da API

## Usuário

1. **Cadastrar Usuário**
   - **Método:** POST  
   - **Endpoint:** `/usuarios`  
   - **Descrição:** Cria um novo usuário no sistema.  
   - **Corpo da Requisição (JSON):**  
     ```json
     {
       "nome": "João Silva",
       "email": "joao@email.com",
       "senha": "senha123"
     }
     ```
    - **Corpo da Resposta (Sucesso):**  
      ```json
      {
        "resposta": "Usuário cadastrado no banco!"
      }
      ```
    - **Corpo da Resposta (Falha):**  
      ```json
      {
       "resposta": "FALHA: Não foi possível cadastrar usuário no banco"
      }
      ```

2. **Validar Usuário**
   - **Métodos:** POST (Sem token)
   - **Endpoint:** `/usuarios/validar`  
   - **Descrição:** Verifica as credenciais do usuário para autenticação.  
   - **Corpo da Requisição (POST - JSON):**  
     ```json
     {
       "email": "joao@email.com",
       "senha": "senha123"
     }
     ```
   - **Corpo da Resposta (Sucesso):**  
     ```json
      {
        "mensagem": "Usuário autenticado!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
     ```

     (No caso, o token gerado pelo servidor (JWT) permite que o o usuário possa logar sem a necessidade de enviar o e-mail e a senha novamente)
    
    - **Corpo da Resposta (Falha):**  
      ```json
      {
        "resposta": "E-mail ou Senha Incorretos"
      }
      ```

3. **Atualizar Usuário**
   - **Método:** PUT  
   - **Endpoint:** `/usuarios/atualizar/{id}`  
   - **Descrição:** Atualiza as informações de um usuário existente.  
   - **Corpo da Requisição (JSON):**  
     ```json
     {
       "nome": "João Souza",
       "email": "joaosouza@email.com"
     }
     ```
   - **Corpo da Resposta (Sucesso):**  
     ```json
     {
       "resposta": "Dados do usuário atualizados!"
     }
     ```
   - **Corpo da Resposta (Falha):**  
      ```json
      {
        "resposta": "FALHA: Não foi possível atualizar os dados do usuário"
      }
      ```
     

4. **Deletar Usuário**
   - **Método:** DELETE  
   - **Endpoint:** `/usuarios/deletar/{id}`  
   - **Descrição:** Remove um usuário do sistema.
   - **Corpo da Resposta (Sucesso):**  
     ```json
     {
       "resposta": "Usuário deletado do sistema"
     }
     ```
   - **Corpo da Resposta (Falha):**  
     ```json
     {
       "resposta": "FALHA: Não foi possível deletar o usuário"
     }
     ```

## Estoque

1. **Criar um Medicamento Novo**
   - **Método:** POST  
   - **Endpoint:** `/estoque`  
   - **Descrição:** Adiciona um novo medicamento ao estoque.  
   - **Corpo da Requisição (JSON):**  
     ```json
     {
       "nome": "Paracetamol",
       "quantidade": 100
     }
     ```
   - **Corpo da Resposta (Sucesso):**  
     ```json
     {
       "resposta": "Medicamento criado!"
     }
     ```
    - **Corpo da Resposta (Falha):**  
      ```json
      {
        "resposta": "FALHA: Não foi possível criar um medicamento novo"
      }
      ```

2. **Buscar medicamentos**
   - **Método:** GET  
   - **Endpoint:** `/estoque/buscar`  
   - **Descrição:** Retorna a lista de medicamentos disponíveis no estoque.

3. **Atualizar Medicamento**
   - **Método:** PUT  
   - **Endpoint:** `/estoque/atualizar/{id}`  
   - **Descrição:** Atualiza os detalhes de um medicamento existente.
   - **Corpo da Requisição (JSON):**  
     ```json
     {
       "quantidade": 200
     }
     ```
   - **Corpo da Resposta (Sucesso):**  
     ```json
     {
       "resposta": "Dados do medicamento atualizados com sucesso"
     }
     ```

4. **Deletar Medicamento**
   - **Método:** DELETE  
   - **Endpoint:** `/estoque/deletar/{id}`  
   - **Descrição:** Remove um medicamento do estoque.
   - **Corpo da Resposta (Sucesso):**  
     ```json
     {
       "resposta": "Medicamento removido do estoque"
     }
     ```

## Gerenciamento da Fila de Medicamentos

**1. Conectar ao WebSocket**
- **Protocolo:** WebSocket  
- **URL:** `ws://api.exemplo.com/fila`  
- **Descrição:** O cliente se conecta para receber e enviar dados da fila em tempo real.

**2. Receber Atualizações da Fila**
- **Descrição:** O servidor envia a lista de pedidos sempre que houver mudanças.
- **Formato da Resposta (JSON):**  
  ```json
  {
    "acao": "atualizar_fila",
    "dados": [
      {
        "id_pedido": 123,
        "medicamento": "Paracetamol",
        "quantidade": 10,
        "status": "aguardando"
      }
    ]
  }
  ```

**3. Adicionar Pedido à Fila**
- **Descrição:** O cliente envia um novo pedido para a fila.  
- **Mensagem Enviada (JSON):**  
  ```json
  {
    "acao": "adicionar_pedido",
    "medicamento": "Amoxicilina",
    "quantidade": 3
  }
  ```

**4. Atualizar Status do Pedido**
- **Descrição:** O cliente pode atualizar o status de um pedido na fila.  
- **Mensagem Enviada (JSON):**  
  ```json
  {
    "acao": "atualizar_status_pedido",
    "id_pedido": 123,
    "status": "finalizado"
  }
  ```

**5. Remover Pedido da Fila**
- **Descrição:** O cliente pode remover um pedido da fila (por exemplo, cancelamento ou erro).  
- **Mensagem Enviada (JSON):**  
  ```json
  {
    "acao": "remover_pedido",
    "id_pedido": 124
  }
  ```
- **Mensagem Recebida (Sucesso):**  
  ```json
  {
    "acao": "pedido_removido",
    "id_pedido": 124,
    "resposta": "Pedido removido da fila"
  }
  ```

## Logs do Sistema

1. **Pegar Logs do Sistema**
   - **Método:** GET  
   - **Endpoint:** `/logs`  
   - **Descrição:** Retorna os registros de logs do sistema para monitoramento e auditoria.