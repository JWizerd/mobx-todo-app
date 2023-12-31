import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { Todo, UpsertTodo } from "../types";
import { makePersistable } from "mobx-persist-store";

export interface ITodoStore {
  todos: Todo[]
  completedTodos: number
  upsertTodo: (todo: UpsertTodo) => void
  removeTodo: (todo: Todo) => void
}

class TodoStore implements ITodoStore {
  todos: Todo[] = []
  constructor() {
    makeAutoObservable(this)
    makePersistable(
      this,
      {
        name: 'TodoStore',
        properties: ['todos'],
        storage: localStorage,
        expireIn: 86400000, // One day in milliseconds
        removeOnExpiration: true,
      }
    )
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
}


export const todoStoreObservable = new TodoStore();


