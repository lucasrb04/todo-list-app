import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import './App.css';

import Form from '../components/Form';
import TodoList from '../components/TodoList';
import { getData, storeData } from '../helpers/localStorage';
import { getAllLists, createUser } from '../service/api';
import TodoLists from '../components/TodoLists';
import List from './List';




function Main() {
  const { pathname } = useLocation();

  const [lists, setLists] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [getToken, setToken] = useState('');


  const authenticateNFetch = async() => {
    const token = getData('token');
    const response = await getAllLists({ token });
    if (!response.message) {
      setLists(response);
      setToken(token)
    } else {
      setRedirect(true);
    }
  }
  // Effect  
  // Para verificar se o usuário já se logou e o token está armanzenado no localStorage
  useEffect(() => {
    authenticateNFetch()
  }, [lists, ]);

  // Function 

  const handleLogout = () => {
    storeData('token', '');
    setRedirect(true);
  }
  return (
    <div className="App">
      {redirect && <Redirect to='/' />}
    <header>
      <button onClick={handleLogout} className="trash-btn logout-btn">
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </header>
    {pathname === '/list' 
            ? <TodoLists lists={lists} setLists={setLists} token={getToken} />
            : <List />}
    </div>
  );
}

export default Main;