import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// import './App.css';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { getData, storeData } from '../helpers/localStorage';
import { editList, getListById } from '../service/api';


const jwt = require('jsonwebtoken');


function ListItem({ setRedirect }) {
  const { pathname } = useLocation();
  // State
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('byTime');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [name, setName] = useState('');


  const fetchData = async() => {
    // Retira o id a partir da url
    const id = pathname.split('/')[2];
    // Busca o token do localStorage
    const token = getData('token');
    // Busca a lista pelo id
    const response = await getListById({ token, id });
    // Atualiza o nome da lista e as tarefas
    setName(response.name);
    setTodos(response.tasks);
  }
  // Para verificar se o usuário já se logou e o token está armanzenado no localStorage
  useEffect(() => {
    // Ao começar a renderização, chama a função para aquição da lista
    fetchData()
  }, []);

  // Effect  
  useEffect(() => {
    // Chama a função de filtrar as tarefas toda vez que as listas ou o status forem alteradas
    filterHlander();
  }, [todos, status]);

  // Function 

  const sortText = (field) => {
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
        const sortedByName = sortText('text');
        setFilteredTodos(sortedByName)
        break;
      case 'byStatus':
        const sortedByStatus = sortText('completed');
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Retira o id a partir da url
    const id = pathname.split('/')[2];
    // Busca o token do localStorage
    const token = getData('token');
    // Busca a lista pelo id
    const response = await editList({ token, id, listInfo: { name, tasks: todos } });
    // Atualiza o nome da lista e as tarefas
    console.log(response);
    if (!response.message) {
      setRedirect(true);
    }
  }
  return (
    <div className="todo-list-container">
      <button 
        onClick={handleSubmit}
        className="save-btn complete-btn" 
        type="submit"
      >
      Salvar Lista
      </button>
        <form>
          <input 
            value={name} 
            onChange={handleChange} 
            type="text" 
            className="todo-input" 
          />
        </form>
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
