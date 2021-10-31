import React, { useState, useEffect } from 'react';
import './App.css';

import Form from '../components/Form';
import TodoList from '../components/TodoList';

function List() {
  // State
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('byTime');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Effect  
  useEffect(() => {
    filterHlander();
  }, [todos, status]);

  // Function 

  const sortMap = (field) => {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const mappedByName = todos.map(function(el, i) {
      return { index: i, value: el[field].toString().toLowerCase() };
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
        const sortedByName = sortMap('text');
        setFilteredTodos(sortedByName)
        break;
      case 'byStatus':
        const sortedByStatus = sortMap('completed');
        setFilteredTodos(sortedByStatus)
        break;
      default:
        setFilteredTodos(todos.sort((a, b) => b.createdAt - a.createdAt));
        break;
    }
  }
  
  return (
    <div className="App">
    <header>
      <h3>Todo List</h3>
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

export default List;
