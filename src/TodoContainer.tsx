import React from "react";
import { observer } from "mobx-react-lite";
import { ITodoStore } from "./store";
import { TodoList } from "./TodoList";
import { todoStoreObservable } from './store';
import { TodoForm } from "./TodoForm";
import { UpsertTodo } from "./types";

const TodoListObservable = observer(TodoList)

type TodoViewProps = {
  todoStore: ITodoStore
}
const TodoView = ({ todoStore }: TodoViewProps) => {
  const handleFormSubmit = (todo: UpsertTodo) => {
    if (todo.name) {
      todoStore.upsertTodo(todo)
    }
  }

  return (
    <div className="todo-view">
      <TodoForm onSubmit={handleFormSubmit} />
      <TodoListObservable 
        todos={todoStore.todos} 
        onRemove={(todo) => todoStore.removeTodo(todo)} 
        onUpdate={(todo) => todoStore.upsertTodo(todo)}
      />
    </div>
  )
}

const TodoContainer: React.FunctionComponent = () => {
  const TodoViewObserver: React.FunctionComponent<{ todoStore: ITodoStore }> = observer(({ todoStore }) => <TodoView todoStore={todoStore} />);

  return (
    <div className="todo-container">
      <TodoViewObserver todoStore={todoStoreObservable} />
    </div>
  )
}

export default TodoContainer;