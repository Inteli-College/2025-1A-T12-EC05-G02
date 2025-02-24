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

2. **Validar Usuário**
   - **Métodos:** GET, POST  
   - **Endpoint:** `/usuarios/validar`  
   - **Descrição:** Verifica as credenciais do usuário para autenticação.  
   - **Corpo da Requisição (POST - JSON):**  
     ```json
     {
       "email": "joao@email.com",
       "senha": "senha123"
     }
     ```

3. **Atualizar Usuário**
   - **Método:** PUT  
   - **Endpoint:** `/usuarios/{id}`  
   - **Descrição:** Atualiza as informações de um usuário existente.  
   - **Corpo da Requisição (JSON):**  
     ```json
     {
       "nome": "João Souza",
       "email": "joaosouza@email.com"
     }
     ```

4. **Deletar Usuário**
   - **Método:** DELETE  
   - **Endpoint:** `/usuarios/{id}`  
   - **Descrição:** Remove um usuário do sistema.

## Estoque

1. **Criar um Remédio Novo**
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

2. **Pegar Remédios**
   - **Método:** GET  
   - **Endpoint:** `/estoque`  
   - **Descrição:** Retorna a lista de medicamentos disponíveis no estoque.

3. **Atualizar Remédio**
   - **Método:** PUT  
   - **Endpoint:** `/estoque/{id}`  
   - **Descrição:** Atualiza os detalhes de um medicamento existente.

4. **Atualizar Quantidade do Remédio**
   - **Método:** PUT  
   - **Endpoint:** `/estoque/{id}/quantidade`  
   - **Descrição:** Atualiza apenas a quantidade de um medicamento específico.  
   - **Corpo da Requisição (JSON):**  
     ```json
     {
       "quantidade": 200
     }
     ```

5. **Deletar Medicamento**
   - **Método:** DELETE  
   - **Endpoint:** `/estoque/{id}`  
   - **Descrição:** Remove um medicamento do estoque.

Aqui está a documentação ajustada para usar endpoints em vez de eventos, mantendo a lógica do WebSocket:  

---

## Gerenciamento da Fila de Medicamentos

**1. Conectar ao WebSocket**
- **Método:** WebSocket  
- **Endpoint:** `ws://api.exemplo.com/fila`  
- **Descrição:** O cliente se conecta para receber e enviar dados da fila em tempo real.

---

**2. Receber Atualizações da Fila**
- **Método:** WebSocket  
- **Endpoint:** `/fila/atualizada`  
- **Descrição:** O servidor envia a lista de pedidos sempre que houver mudanças.  
- **Formato da Resposta (JSON):**  
  ```json
  {
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

---

**3. Adicionar Pedido à Fila**
- **Método:** WebSocket  
- **Endpoint:** `/fila/adicionar`  
- **Descrição:** Enviar um novo pedido para a fila.  
- **Corpo da Requisição (JSON):**  
  ```json
  {
    "medicamento": "Amoxicilina",
    "quantidade": 3
  }
  ```

---

**4. Atualizar Status do Pedido**
- **Método:** WebSocket  
- **Endpoint:** `/fila/atualizar`  
- **Descrição:** Atualiza o status de um pedido específico na fila.  
- **Corpo da Requisição (JSON):**  
  ```json
  {
    "id_pedido": 123,
    "status": "finalizado"
  }
  ```

---

**5. Remover Pedido da Fila**
- **Método:** WebSocket  
- **Endpoint:** `/fila/remover`  
- **Descrição:** Remove um pedido da fila (por exemplo, cancelamento ou erro).  
- **Corpo da Requisição (JSON):**  
  ```json
  {
    "id_pedido": 124
  }
  ```

## Logs do Sistema

1. **Pegar Logs do Sistema**
   - **Método:** GET  
   - **Endpoint:** `/logs`  
   - **Descrição:** Retorna os registros de logs do sistema para monitoramento e auditoria.