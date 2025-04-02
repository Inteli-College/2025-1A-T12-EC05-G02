export type Status = 'fila' | 'em-preparo' | 'separado'
export type Priority = '1' | '2' | '3'

export type Medicamento = {
  nome: string,
  quantidade: number
}

export type Fita = {
  id: string,
  status: Status,
  priority: Priority,
  order: number,
  nomePaciente: string,
  leito: string, 
  medicamentos: Medicamento[]
}

export const statuses: Status[] = ['fila', 'em-preparo', 'separado']
export const priorities: Priority[] = ['1', '2', '3']

export type RobotStatus = {
  status: string,
  x: number,
  y: number,
  z: number
}