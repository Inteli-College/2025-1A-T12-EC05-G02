---
sidebar_position: 2
slug: /sprint-4/integracao/envio-requisicao
description: Funcionamento do Envio da Fita Para Separação
---

# Envio de Fita

&emsp;O envio da fita para separação é um processo que envolve a comunicação entre o sistema e o robô. Abaixo estão os detalhes sobre como esse processo funciona.

## Funcionamento
&emsp;O envio da fita para separação é realizado através de uma requisição HTTP POST. O sistema envia os dados necessários para o robô, que então processa a solicitação e inicia a separação dos medicamentos. O robô espera receber informações sobre a prioridade do pedido, quem liberou o pedido, o ID do paciente e os medicamentos a serem separados.

## Requisição
&emsp;A requisição, que utiliza o método HTTP `POST`, é enviada para o endpoint `/medicine/prescription` do robô. O corpo da requisição deve conter os seguintes dados:

```json
{
    "prioridade": 1,
    "liberadoPor": "Leo",
    "pacienteId": 0,
    "medicamentos": [
        {
            "id": 1,
            "quantidade": 1
        }
    ]
}
```

### Campos da Requisição
- **prioridade**: Indica a prioridade do pedido. Pode ser um número inteiro.
- **liberadoPor**: Nome da pessoa que liberou o pedido. Deve ser uma string.
- **pacienteId**: ID do paciente associado ao pedido. Deve ser um número inteiro.
- **medicamentos**: Lista de medicamentos a serem separados. Cada medicamento deve conter:
  - **id**: ID do medicamento. Deve ser um número inteiro.
  - **quantidade**: Quantidade do medicamento a ser separado. Deve ser um número inteiro.

## Exemplo de Requisição
&emsp;Para enviar uma requisição para o robô, você pode usar a ferramenta `curl` no terminal. Aqui está um exemplo de como fazer isso:
```bash
curl -X POST http://localhost:6001/medicine/prescription \
-H "Content-Type: application/json" \
-d '{
    "prioridade": 1,
    "liberadoPor": "Leo",
    "pacienteId": 0,
    "medicamentos": [
        {
            "id": 1,
            "quantidade": 1
        }
    ]
}'
```
### Resposta
&emsp;A resposta do robô será um JSON contendo o status da operação. Um exemplo de resposta bem-sucedida pode ser:

```json
{
    "status": "success",
    "message": "Fita enviada para separação com sucesso."
}
```

#### Erros

&emsp;Caso ocorra algum erro durante o processamento da requisição, o robô retornará um JSON com o status de erro e uma mensagem descritiva. Um exemplo de resposta de erro pode ser:

```json
{
    "status": "error",
    "message": "Erro ao enviar a fita para separação."
}
```

## Conclusão
&emsp;O envio da fita para separação é um processo simples, permitindo que o robô receba as instruções necessárias para iniciar a separação dos medicamentos. Através de uma requisição HTTP POST, o sistema pode se comunicar com o robô e garantir que os pedidos sejam processados corretamente.