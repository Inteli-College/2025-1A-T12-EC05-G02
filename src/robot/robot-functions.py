def move_to_bin(device, positions, bin_num, r, i):
    if bin_num not in positions:
        raise ValueError(f"Bin '{bin_num}' não encontrada!")
    
    counter = 1
    while counter <= i:
        device.movej_to(
            positions[bin_num]['pos_x'],
            positions[bin_num]['pos_y'],
            positions[bin_num]['pos_z'],
            r,
            wait=True
        )
        print(f'Movimento para {bin_num}')
        device.movel_to(
            positions[bin_num]['pos_x'],
            positions[bin_num]['pos_y'],
            15,
            r,
            wait=True
        )
        device.suck(True)
        device.movel_to(
            positions[bin_num]['pos_x'],
            positions[bin_num]['pos_y'],
            160,
            r,
            wait=True
        )
        device.movej_to(
            positions['dispenser']['pos_x'],
            positions['dispenser']['pos_y'],
            positions['dispenser']['pos_z'],
            r,
            wait=True
        )
        device.suck(False)

        return_home(device, positions)

    iter += 1

def return_home(device, positions: dict):
    device.movej_to(
        positions['home']['pos_x'],
        positions['home']['pos_y'],
        positions['home']['pos_z'],
        0,
        wait=True
    )