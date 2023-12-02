import React, { useEffect, useRef, useState } from "react";
import { UpsertTodo } from "./types";
import './TodoForm.css';

type Props = {
  onSubmit: (todo: UpsertTodo) => any
}
export const TodoForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus();
  }, [])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit({ name, description })
    setName('');
    setDescription('');
    nameInputRef.current && nameInputRef.current.focus();
  }

  return (
    <div className="todo-form">
      <form 
        className="todo-new-form" 
        onSubmit={handleSubmit}
      >
        <label htmlFor="new-name">
          <input 
            required
            type="text"
            name="name" 
            id="new-name"
            value={name}
            onChange={(event) => setName(event.target.value)} 
            placeholder="Title"
            ref={nameInputRef}
          />
        </label>
        
        <label htmlFor="new-description">
          <input 
            type="text"
            name="description" 
            id="new-description"
            placeholder="Description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        
        <button type="submit">Create</button>
      </form>
    </div>
  )
}