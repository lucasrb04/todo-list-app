import React, { useState } from 'react';
import './App.css';

import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  
  return (
    <div className="App">
    <header>
      <h1>Todo List </h1>
    </header>
    <Form setTodos={setTodos} todos={todos}/>
    <TodoList setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
