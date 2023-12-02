export type Todo = {
  id: string
  name: string,
  description?: string,
  completed: boolean,
}

export type UpsertTodo = {
  id?: string
  name: string,
  description?: string,
  completed?: boolean,
}
