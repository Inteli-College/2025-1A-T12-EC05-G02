export type Status = 'fila' | 'em-preparo' | 'separado'
export type Priority = 'low' | 'medium' | 'high'
export type Fita = {
  title: string,
  id: string,
  status: Status,
  priority: Priority,
  points?: number,
  order: number // Adicionado para controlar a ordem
}

export const statuses: Status[] = ['fila', 'em-preparo', 'separado']
export const priorities: Priority[] = ['low', 'medium', 'high']