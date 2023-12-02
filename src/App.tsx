import React from 'react';
import './App.css';
import './Form.css';
import TodoContainer from './TodoContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Today's Todos</h1>
      </header>
      <main>
        <TodoContainer />
      </main>
    </div>
  );
}

export default App;
