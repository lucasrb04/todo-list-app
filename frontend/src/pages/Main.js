import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import './App.css';

import { getData, storeData } from '../helpers/localStorage';
import { getAllLists } from '../service/api';
import TodoLists from '../components/TodoLists';
import List from './List';
import Consumer from '../helpers/context/Consumer';




function Main() {
  const { pathname } = useLocation();

  const { userInfo } = useContext(Consumer);

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
      <h3 className="header-name">{userInfo.user}</h3>
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
