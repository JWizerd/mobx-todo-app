import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./types";
import './TodoItem.css';

type TodoItemProps = {
  todo: Todo
  onRemove: (todo: Todo) => any
  onUpdate: (todo: Todo) => any
}

export const TodoItem = ({ todo, onRemove, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const [complete, setComplete] = useState(todo.completed);
  const nameInputRef = useRef<HTMLInputElement|null>(null);
  const [description, setDescription] = useState<string|undefined>(todo.description);

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditing])

  const handleComplete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const updatedCompleted = !complete;

    onUpdate({
      ...todo,
      completed: updatedCompleted,
    })

    setComplete(updatedCompleted)
  }

  const handleRemove = () => {
    onRemove(todo);
  }

  const updateTodo = () => {
    if (isEditing) {
      onUpdate({
        ...todo,
        name,
        description
      })

      setIsEditing(false);
      return;
    }

    setIsEditing(true);
  }

  
  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      debugger
      updateTodo();
    }
  }

  const handleUpdate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

   updateTodo();
  }

  return (
    <div className={`todo ${todo.completed ? 'todo-complete' : ''}`}>
      {isEditing
        ? (
          <form className="todo-update-form">
            <input 
              required
              type="text"
              value={name} 
              name="name" 
              onChange={(event) => setName(event.target.value)} 
              onKeyUp={handleEnter}
              ref={nameInputRef}
            />
            
            <input 
              type="text" 
              value={description} 
              name="description"
              placeholder="Description (optional)" 
              onChange={(event) => setDescription(event.target.value)}
              onKeyUp={handleEnter}
            />
          </form>
        ) : (
          <div className="todo-content">
            <h3>{todo.name}</h3>
            {todo.description && (<p>{todo.description}</p>)}
          </div>
        )
      }
      
      <div className="todo-controls">
        <button className="complete-icon" style={{ background: complete ? 'darkcyan' : 'tan' }} onClick={handleComplete}>
          &#x2713;
        </button>

        <button className="remove-icon" style={{ background: complete ? 'red' : 'tan' }} onClick={handleRemove}>
          &#10005;
        </button>

        <button className="edit-icon" style={{ background: isEditing ? 'orange' : 'tan' }} onClick={handleUpdate}>
          &#9998;
        </button>
      </div>
    </div>
  )
}