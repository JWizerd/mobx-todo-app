import React from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "./types";
import './TodoList.css';

type TodoListProps = { 
  todos: Todo[], 
  onRemove: (todo: Todo) => any, 
  onUpdate: (todo: Todo) => any 
}

export const TodoList: React.FunctionComponent<TodoListProps> = ({ todos, onRemove, onUpdate }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const inCompleteTodos = todos.filter(todo => !todo.completed);
  return (
    <div className="todo-lists">
      {inCompleteTodos.length === 0 && completedTodos.length > 0 ? 
        (
          <div>
            <h2>
              <span>All todos complete for the day! 🎉👏</span>
            </h2>
          </div>
        ) : (
          <div className="todo-list">
            {inCompleteTodos.map(todo => (
              <TodoItem 
                key={todo.id}
                todo={todo}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )
      }
      {completedTodos.length > 0 && 
        (
          <div className="todo-list todo-list-complete">
            <hr />
            {completedTodos.map(todo => (
              <TodoItem 
                key={todo.id}
                todo={todo}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )
      }
    </div>
  )
}