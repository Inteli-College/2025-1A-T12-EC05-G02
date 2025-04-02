---
sidebar_position: 3
slug: /sprint-4/integracao/monitoramento
description: Funcionamento do Monitoramento Atual
---

# Monitoramento e armazenamento de Logs
Este documento descreve o sistema de logs utilizado no projeto. Cada chamada da função `logger()` tem a função de registrar eventos e informações relevantes sobre a execução do sistema, facilitando o monitoramento, a depuração e a análise de erros.

## Estrutura do Log
Os logs são gerados com mensagens formatadas que contêm:
- **Descrição da Ação:** O que está acontecendo no sistema.
- **Variáveis Dinâmicas:** Algumas mensagens incluem informações dinâmicas, como timestamps, dados processados e status da execução.
- **Nível do Log:** (Erro, informação, etc.)

# Tipos de Logs

### **Erro ao obter logs de prescrição**
- **Nível do Log:** Erro
- **Mensagem registrada:** `Erro ao obter logs de prescrição: {e}`
- **Exemplo de mensagem registrada:** `Erro ao obter logs de prescrição: Timeout na conexão`
- O log existe para identificar falhas ao tentar acessar registros de prescrições médicas no sistema.

### **Erro ao atualizar a fila de prescrição**
- **Nível do Log:** Erro
- **Mensagem registrada:** `Erro ao atualizar a fila: {e}`
- **Exemplo de mensagem registrada:** `Erro ao atualizar a fila: Banco de dados inacessível`
- O log serve para capturar problemas ao modificar a fila de processamento de prescrições, auxiliando no diagnóstico de falhas operacionais.

### **Erro ao obter status de prescrição**
- **Nível do Log:** Erro
- **Mensagem registrada:** `Erro ao obter status de prescrição: {e}`
- **Exemplo de mensagem registrada:** `Erro ao obter status de prescrição: Falha no servidor`
- Esse log é útil para detectar falhas no acesso ao status das prescrições médicas.

### **Registro de mensagem genérica com timestamp**
- **Nível do Log:** Informação
- **Mensagem registrada:** `{message} Timestamp: {current_time}`
- **Exemplo de mensagem registrada:** `Processo concluído Timestamp: 2025-03-31 14:35:20`
- Esse log permite registrar eventos genéricos junto ao timestamp do momento de execução.

### **QR Code lido com sucesso**
- **Nível do Log:** Informação
- **Mensagem registrada:** `QR Code lido com sucesso. Timestamp: {current_time}`
- **Exemplo de mensagem registrada:** `QR Code lido com sucesso. Timestamp: 2025-03-31 14:36:05`
- Esse log confirma que um QR Code foi detectado e lido corretamente.

### **Dados do QR Code foram processados**
- **Nível do Log:** Informação
- **Mensagem registrada:** `O QR Code lido foi processado. Dados: {info}  Timestamp: {current_time}`
- **Exemplo de mensagem registrada:** `O QR Code lido foi processado. Dados: ID=12345  Timestamp: 2025-03-31 14:36:10`
- O log indica que as informações extraídas do QR Code foram corretamente processadas pelo sistema.

### **Movimentação interrompida pelo comando stopRobot**
- **Nível do Log:** Aviso
- **Mensagem registrada:** `Movimentação interrompida pelo comando stopRobot.`
- **Exemplo de mensagem registrada:** `Movimentação interrompida pelo comando stopRobot.`
- O log registra quando o robô teve sua movimentação parada por um comando externo.

### **Buscando um item específico**
- **Nível do Log:** Informação
- **Mensagem registrada:** `[bold cyan]Buscando {drug}...`
- **Exemplo de mensagem registrada:** `[bold cyan]Buscando dipirona...`
- Esse log indica que o robô iniciou o processo de busca por um determinado item.

### **Movimento iniciado para coletar um item**
- **Nível do Log:** Informação
- **Mensagem registrada:** `Movimento para {drug}`
- **Exemplo de mensagem registrada:** `Movimento para paracetamol`
- O log confirma que o robô está se movendo em direção ao local onde o item está localizado.

### **Retornando para o ponto de referência**
- **Nível do Log:** Informação
- **Mensagem registrada:** `Retornando para ponto de referência`
- **Exemplo de mensagem registrada:** `Retornando para ponto de referência`
- Esse log indica que o robô finalizou sua tarefa e está voltando à sua posição inicial.

### **Item coletado com sucesso**
- **Nível do Log:** Sucesso
- **Mensagem registrada:** `✓ {drug} coletado!`
- **Exemplo de mensagem registrada:** `✓ ibuprofeno coletado!`
- Esse log confirma que o item foi localizado e coletado com êxito pelo robô.

## Conclusão

O sistema de logs foi projetado para fornecer informações detalhadas sobre a execução do código, facilitando a análise de eventos e identificação de problemas. As mensagens seguem um padrão de formatação para melhor visualização e rastreabilidade.
