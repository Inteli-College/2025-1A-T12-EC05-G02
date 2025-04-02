---
sidebar_position: 4
slug: /sprint-4/backend
description: Documentação das rotas criadas na sprint 4.
---

# Integração Sistema - Banco de dados

&emsp; Para além da integração entre sistema e robô, é necessário integrar sistema e banco de dados. Isso permite que a PharmaTech possa persistir as interações do usuário no sistema. Além disso, permite criar um sistema de login, salvar interações do usuário e - o mais importante para um sistema de monitoramento - persistir as ações e o estado do robô.

&emsp; Na sprint 3, a Pharmatech já tinha criado rotas no backend para armazenar e visualizar os logs do sistema. Nessa sprint, outras informações puderam ser realizadas e persistidas, com a ajuda de rotas HTTP para acontecerem. Abaixo, vê-se as interações que o sistema tem com o banco de dados e por quais rotas isso é feito. Evidencia-se que essas rotas têm como base o CRUD (Create, Read, Update e Delete). Entretanto, nem todas rotas do CRUD foram implementadas por razões de regras de negócio.

## Rotas Criadas

### Bins

1. Criar Bin
Rota: ``bins/criar``;
Tabela: configuracoes_bins
Método: POST
Corpo:  
```json
{
    "nomeBin": /**<string> Nome do Bin **/,
    "nomeMedicamento": /**<string> Nome do Bin **/,
    "quantidade":  /**<int> Quantidade de remédio **/,
    "x": /**<float> coordenada x **/,
    "y": /**<float> coordenada y **/,
    "z": /**<float> coordenada z **/
}
```

2. Listar Bins
Rota: ``bins/criar``;
Tabela: configuracoes_bins
Método: GET

3. Encontrar um bin
Rota: ``bins/list/<int:id>``;
Tabela: configuracoes_bins
Método: GET

4. Editar um bin
Rota: ``bins/editar/<int:id>``;
Tabela: ``configuracoes_bins`` 
Método: POST
Observação: Apesar de PUT ser o método mais adequado, a componentização do formulário no modal, nos fez recorrer a um método mais geral: o POST

### Prescrições

1. Criar uma prescrição
Rota: ``/medicine/prescription``
Tabelas: ``Pedido`` e ``PedidoMedicamento``
Método: POST
Corpo: 
```json
{
    "pacienteId": /**<int> ID do paciente **/,
    "prioridade": /**<string> Prioridade da prescrição **/,
    "liberadoPor": /**<string> Nome do farmacêutico **/,
    "medicamentos": [
        {
            "id": /**<int> ID do medicamento **/,
            "quantidade": /**<int> Quantidade do medicamento **/
        }
    ]
}
```
Observação: Ao criar a prescrição, o sistema adiciona um registro na tabela Pedido e, para cada medicamento, um registro na tabela PedidoMedicamento. Após a criação, são emitidos os eventos socket "medicine" (caso nenhum item esteja com status "Separando") e "queue" com a fila atualizada.

2. Listar as prescrições em ordem decrescente de data do pedido
Rota: ``/medicine/logs``
Tabela: ``Pedido``
Método: GET

3. Fila de Medicamentos
Rota: ``/medicine/queue``
Tabelas: ``Pedido``, ``PedidoMedicamento`` e ``Medicamento``
Método: GET
Observação: Retorna a fila completa de medicamentos para os pedidos realizados no dia corrente, organizando as informações de cada pedido e os seus medicamentos. Além disso, emite o evento socket ``medicineQueue`` com a fila. Essa rota é tanto da integração sistema-robô quanto da integração sistema - banco de dados

4. Contagem de Pedidos Pendentes e Completo
Rota: ``/medicine/statuses``
Tabela: ``Pedido``
Método: GET

:::warning[Alerta]

Devido as regras de negócio desse projeto, não é recomendado criar rotas de deleção de prescrições, isso porque prescrições irá interagir com outros sistemas e está ligada com grande parte das tabelas do projeto. Deste modo, deletar uma prescrição causaria um problema para a segurança dos dados.

::: 

### Estoque

1. Listar Medicamentos no estoque 
Rota: ``/estoque/``
Tabela: ``Estoque`` e ``Medicamento``
Método: GET

2. Criar um item no estoque
Rota: ``/estoque/criar``
Tabela: ``Estoque``
Método: POST
Corpo: 
```json
{
    "medicamento_id": /**<int> ID do medicamento **/,
    "quantidade": /**<int> Quantidade em estoque **/,
    "bin_localizacao": /**<string> Localização do bin (opcional) **/
}
``` 


## Rotas a criar na sprint 5

&emsp; Para a próxima sprint, é preciso criar rotas de CRUD para medicamentos e paciente. Nessa sprint, foi necessário utilizar o SGBD DBeaver para conseguir interagir com essas rotas. Ademais, é necessário criar rotas de deleção e atualização do estoque. Por último, é necessário atualizar prescrições.

