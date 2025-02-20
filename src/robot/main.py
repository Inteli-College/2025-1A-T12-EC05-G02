import pydobot.enums
import pydobot.enums.CommunicationProtocolIDs
import pydobot.enums.ControlValues
import pydobot.message
import json
import pydobot
from serial.tools import list_ports
from robot_functions import move_to_bin, return_home

class InteliDobot(pydobot.Dobot):
    def __init__(self, port=None, verbose=False):
        super().__init__(port=port, verbose=verbose)
    def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)
    def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)
    def SetSpeed(self, speed, acceleration):
        super().speed(speed,acceleration)

# Carrega o json com as coordenadas das bins
file_name = 'positions.json'
def get_pos(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)
    
# Carregar as posições do arquivo positions.json
positions = get_pos('positions.json')
available_ports = list_ports.comports()
print(f'available ports: {[x.device for x in available_ports]}')
port = available_ports[0].device

# Cria instância da classe InteliDobot para utilização dos métodos move_to
device = InteliDobot(port=port, verbose=False)

# Loga a posição atual do robô e o retorna à home
(x, y, z, r, j1, j2, j3, j4) = device.pose()
print(f'x:{x} y:{y} z:{z} j1:{j1} j2:{j2} j3:{j3} j4:{j4}')

device.suck(False)
return_home(device, positions)

# Inputs de configuração da rotina do robô
for i in positions:
    print(i)
text_input = input('Quais bins deseja buscar? ')
bins = text_input.split(', ')
num_input = input('Quantos medicamentos deseja pegar para cada medicamento (respectivamente)? ')
print(f'number {num_input}')
list_numbers = num_input.split(', ')

print(list_numbers, type(list_numbers))

i = 0

for number in list_numbers:
    print(f'number: {number}')
    quantity = list_numbers[i]
    print(f'quantity {quantity}')
    if bins:
        move_to_bin(device, positions, bins[i], r, quantity)
    i += 1
    print(i)