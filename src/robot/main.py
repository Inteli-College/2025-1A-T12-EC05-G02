import pydobot.enums
import pydobot.enums.CommunicationProtocolIDs
import pydobot.enums.ControlValues
import pydobot.message
import json
import pydobot
from serial.tools import list_ports
from robot import move_to_bin, return_home

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
text = input('Quais bins deseja buscar? ')
bins = text.split(', ')
number = input('Quantos medicamentos deseja pegar para cada medicamento (respectivamente)? ')
print(f'number {number}')
quantity = number.split(', ')

print(quantity, type(quantity))

# 
for i in quantity:
    if bins:
        for bin in bins:
            move_to_bin(device, positions, bin, r, int(i))