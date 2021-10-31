import React, { useState, useEffect } from 'react';
import './App.css';

import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  // State
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('byTime');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Effect  
  useEffect(() => {
    filterHlander();
  }, [todos, status]);

  // Function 

  const filterMap = (field) => {
    const mappedByName = todos.map(function(el, i) {
      return { index: i, value: el[field].toLowerCase() };
    })
    mappedByName.sort(function(a, b) {
      return +(a.value > b.value) || +(a.value === b.value) - 1;
    });
    const resultByName = mappedByName.map(function(el){
      return todos[el.index];
    });
    return resultByName;
  }

    const filterHlander = () => {
    switch (status) {
      case 'byName':
        // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        const mappedByName = todos.map(function(el, i) {
          return { index: i, value: el.text.toLowerCase() };
        })
        mappedByName.sort(function(a, b) {
          return +(a.value > b.value) || +(a.value === b.value) - 1;
        });
        const resultByName = mappedByName.map(function(el){
          return todos[el.index];
        });
        setFilteredTodos(resultByName)
        break;
      case 'byTime':
        setFilteredTodos(todos.sort((a, b) => a.createdAt - b.createdAt));
        break;
      case 'byStatus':
        // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        const mappedByStatus = todos.map(function(el, i) {
          return { index: i, value: el.completed };
        })
        mappedByStatus.sort(function(a, b) {
          return +(b.value > a.value) || +(b.value === a.value) - 1;
        });
        const resultByStatus = mappedByStatus.map(function(el){
          return todos[el.index];
        });
        setFilteredTodos(resultByStatus)
        break;
      default:

        break;
    }
  }
  
  return (
    <div className="App">
    <header>
      <h1>Todo List </h1>
    </header>
    <Form 
      setTodos={setTodos} 
      todos={todos}
      setStatus={setStatus}
    />
    <TodoList setTodos={setTodos} todos={todos} filteredTodos={ filteredTodos }/>
    </div>
  );
}

export default App;
