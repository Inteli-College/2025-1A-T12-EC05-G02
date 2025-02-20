def move_to_bin(device, positions, bin_num, r, iter):
    if bin_num not in positions['bins']:
        raise ValueError(f"Bin '{bin_num}' não encontrada!")

    counter = 0

    while counter < int(iter):
    
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
            15,
            r,
            wait=True
        )

        device.suck(True)

        device.movel_to(
            positions['bins'][bin_num]['pos_x'],
            positions['bins'][bin_num]['pos_y'],
            120,
            r,
            wait=True
        )

        return_home(device, positions)

        device.movej_to(
            positions['presets']['dispenser']['pos_x'],
            positions['presets']['dispenser']['pos_y'],
            positions['presets']['dispenser']['pos_z'],
            r,
            wait=True
        )
        
        device.suck(False)

        return_home(device, positions)
        counter += 1

def return_home(device, positions: dict):
    device.movej_to(
        positions['presets']['home']['pos_x'],
        positions['presets']['home']['pos_y'],
        positions['presets']['home']['pos_z'],
        0,
        wait=True
    )
