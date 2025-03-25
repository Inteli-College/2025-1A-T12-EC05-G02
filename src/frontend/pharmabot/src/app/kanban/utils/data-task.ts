export type Status = 'fila' | 'em-preparo' | 'separado'
export type Priority = 'low' | 'medium' | 'high'

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
export const priorities: Priority[] = ['low', 'medium', 'high']

export type RobotStatus = {
  status: string,
  x: number,
  y: number,
  z: number
}