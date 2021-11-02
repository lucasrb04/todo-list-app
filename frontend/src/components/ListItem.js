import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// import './App.css';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { getData, storeData } from '../helpers/localStorage';
import { getAllLists, getListById } from '../service/api';


const jwt = require('jsonwebtoken');


function ListItem() {
  const { pathname } = useLocation();
  // State
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('byTime');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [name, setName] = useState('');


  const fetchData = async() => {
    const id = pathname.split('/')[2];
    console.log(id);
    const token = getData('token');
    const response = await getListById({ token, id });
    console.log(response);
    setName(response.name);
    
  }
  // Para verificar se o usuário já se logou e o token está armanzenado no localStorage
  useEffect(() => {
    fetchData()
  }, []);

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

  const handleChange = (e) => {
    setName(e.target.value);
  }
  
  return (
    <div className="todo-list-container">
      <header >
        <h2>Nome da Lista:</h2>
        <form>
          <input 
            value={name} 
            onChange={handleChange} 
            type="text" 
            className="todo-input" 
          />
        </form>
      </header>
      <TodoForm 
        setTodos={setTodos} 
        todos={todos}
        setStatus={setStatus}
      />
      <TodoList 
        setTodos={setTodos} 
        todos={todos} 
        filteredTodos={ filteredTodos }
      />
    </div>
  );
}

export default ListItem;
