---
sidebar_position: 3
slug: /sprint-3/backend/robotBack

---

# Backend do Robô

&emsp; O servidor WebSocket é responsável por receber mensagens do robô e enviá-las para o backend, além de receber mensagens do backend e enviá-las para o robô. Ele é implementado em Python utilizando a biblioteca `socketio`.

## Configuração do Servidor

&emsp; O cliente Socket.IO é configurado para escutar eventos específicos, como `connect`, `disconnect` e `medicine`. Esses eventos são tratados por métodos que executam ações específicas, como conectar ao servidor, desconectar e processar dados relacionados à separação de medicamentos.

### Eventos e Payloads

&emsp; Um **evento** é uma mensagem enviada ou recebida pelo servidor ou cliente para indicar que algo aconteceu. O **payload** é o conteúdo da mensagem, geralmente em formato JSON, que contém os dados necessários para processar o evento.

&emsp;**connect**: 
    - **Descrição**: Indica que o robô foi conectado ao servidor.
    - **Payload Enviado pelo Robô**: 
        ```json
        {
            "data": "Robo conectado ao servidor"
        }
        ```


&emsp;**disconnect**: 
    - **Descrição**: Indica que o robô foi desconectado do servidor.
    - **Payload Enviado pelo Robô**: 
        ```json
        {
            "data": "Robo desconectado do servidor"
        }
        ```

&emsp;**medicine**: 
    - **Descrição**: Contém informações sobre os bins e o ID da fita para separação de medicamentos.
    - **Payload Recebido**: 
        ```json
        {
            "bins": {
                "bin1": 2,
                "bin2": 3
            },
            "idFita": "12345"
        }
        ```

### Métodos de Tratamento de Eventos

&emsp; Os métodos `connect()`, `disconnect()` e `medicine()` são responsáveis por tratar os eventos `connect`, `disconnect` e `medicine`, respectivamente. Eles recebem o payload do evento e executam ações específicas, como imprimir mensagens no console, processar dados e emitir eventos de resposta.

```python
@sio.event
def connect():
        print('Conectado ao servidor!')
        sio.emit('connectResponse', {'data': 'Robo conectado ao servidor'})

@sio.event
def disconnect():
        print('Desconectado do servidor.')
        sio.emit('disconnectResponse', {'data': 'Robo desconectado do servidor'})

@sio.event
def medicine(data):
        print("medicine: ", str(data))
        
        result = {
                'action': 'collect', 'bins': data['bins'], 'idFita': data['idFita']
        }
        separateMedicine(result)
```

## Separação de Medicamentos

&emsp; O método `separateMedicine()` é responsável por gerenciar a separação de medicamentos. Ele utiliza o robô Dobot para realizar movimentos precisos até as posições das bins, desativar a sucção e retornar à posição inicial. Durante o processo, eventos são emitidos para o servidor para registrar logs e atualizar o status da operação.

### Eventos e Respostas

&emsp;**Log de Separação**:
    - **Evento Emitido**: `log`
    - **Payload**:
        ```json
        {
            "acao": "Robot Log - Separar",
            "detalhes": "Iniciando separação de fita de medicamentos, ID: 12345",
            "usuario_id": 1
        }
        ```

&emsp;**Status de Separação**:
    - **Evento Emitido**: `medicineResponse`
    - **Payload Inicial**:
        ```json
        {
            "status": "Separando",
            "idFita": "12345"
        }
        ```
    - **Payload Final**:
        ```json
        {
            "status": "Completo",
            "idFita": "12345"
        }
        ```

### Método de Separação de Medicamentos

&emsp; O método `separateMedicine()` recebe o resultado da leitura do QR Code e executa a separação de medicamentos. Ele inicia a separação, emite eventos de log e status, movimenta o robô até as bins e retorna à posição inicial.

```python
def separateMedicine(result):
        device = InteliDobot(verbose=False)  # Inicializa o robô Dobot com a porta detectada.
        bins = result['bins']
        print(result)
        device.suck(False)  # Desliga a sucção do robô.
        return_home(device, positions)  # Retorna o robô para a home.
        
        sio.emit('log', {'acao': 'Robot Log - Separar', 'detalhes': 'Iniciando separação de fita de medicamentos, ID: ' + str(result['idFita']), 'usuario_id': 1})
        sio.emit('medicineResponse', {'status': 'Separando', "idFita": str(result['idFita'])})
        
        for bin in bins:  # Percorre os bins e executa a movimentação para coleta.
                move_to_bin(device, positions, bin, 0, bins[bin])
                
        sio.emit('medicineResponse', {'status': 'Completo', "idFita": str(result['idFita'])})
```
