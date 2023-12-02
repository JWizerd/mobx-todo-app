import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { Todo, UpsertTodo } from "../types";

export interface ITodoStore {
  todos: Todo[]
  completedTodos: number
  upsertTodo: (todo: UpsertTodo) => void
  removeTodo: (todo: Todo) => void
  clearTodos: () => void
}

class TodoStore implements ITodoStore {
  todos: Todo[] = []
  constructor() {
    makeAutoObservable(this)
  }

  get completedTodos() {
    return this.todos.filter(t => t.completed).length;
  }

  private todoIndex(todo: Todo) {
    return this.todos.findIndex(t => t.id === todo.id)
  }

  upsertTodo(todo: UpsertTodo) {
    if (!todo.id) {
      this.todos.push({
        ...todo,
        completed: false,
        id: uuidv4()
      });
      
      return;
    }

    const existingTodo = todo as Todo;
    const index = this.todoIndex(existingTodo);
    this.todos[index] = existingTodo;
  }

  removeTodo(todo: Todo) {
    const index = this.todoIndex(todo);
    if (index !== -1) {
      this.todos.splice(index, 1)
    }
  }

  clearTodos() {
    this.todos = [];
  }
}


export const todoStoreObservable = new TodoStore();


