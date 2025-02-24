# Este arquivo concentra as funções de movimentação do robô Dobot Magician Lite.

# Cria função de movimentação às bins especificadas
def move_to_bin(device, positions, bin_num, r, iter):
    if bin_num not in positions['bins']:
        raise ValueError(f"Bin '{bin_num}' não encontrada!")

    counter = 0

    # Loop de iteração sobre a quantidade de coletas na mesma bin
    while counter < int(iter):
        
        # Move o sugador para as posições da bin especificada
        device.movej_to(
            positions['bins'][bin_num]['pos_x'],
            positions['bins'][bin_num]['pos_y'],
            positions['bins'][bin_num]['pos_z'],
            r,
            wait=True
        )

        print(f'Movimento para {bin_num}')

        device.movel_to(
            positions['bins'][bin_num]['pos_x'],
            positions['bins'][bin_num]['pos_y'],
            18,
            r,
            wait=True
        )

        # Ativa a sucção do bico sugador
        device.suck(True)

        device.movel_to(
            positions['bins'][bin_num]['pos_x'],
            positions['bins'][bin_num]['pos_y'],
            120,
            r,
            wait=True
        )

        # Move o sugador para a posição de referência home
        return_home(device, positions)

        device.movej_to(
            positions['presets']['dispenser']['pos_x'],
            positions['presets']['dispenser']['pos_y'],
            positions['presets']['dispenser']['pos_z'],
            r,
            wait=True
        )
        
        # Desativa a sucção do bico sugador
        device.suck(False)

        # Retorna o sugador para a posição de referência home
        return_home(device, positions)

        # Adiciona unidade ao iterador
        counter += 1


# Função para definição da posição de referência home
def return_home(device, positions: dict):
    device.movej_to(
        positions['presets']['home']['pos_x'],
        positions['presets']['home']['pos_y'],
        positions['presets']['home']['pos_z'],
        0,
        wait=True
    )
