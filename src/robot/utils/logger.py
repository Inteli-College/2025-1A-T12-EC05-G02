from extensions import sio

def logger(data):
    sio.emit('log', {'acao': 'Robot Log', 'detalhes': data, 'usuario_id': 1})
    console.print(
            Panel
            (
                data
            )
        )