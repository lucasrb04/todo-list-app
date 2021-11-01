import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './App.css';
import { login, createUser } from '../service/api';



import { getData, storeData } from '../helpers/localStorage';

const jwt = require('jsonwebtoken');

const Authenticated = ({todos, setTodos, filteredTodos}) => {
  const { pathname } = useLocation();
  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [userInfo, setUserInfo] = useState({ user: '', password: '' });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo({
      ...userInfo,
       [name]: value
    });
  };

  const fetchData = async(token) => {
    const secret = process.env.REACT_APP_JWT_SECRET;
    if (token) {
      const decoded = jwt.verify(token, secret);
      const { user, password } = decoded;
      const response = await login({ user, password });
      
      console.log(response);
      // const responseJson = await response.json();
      // return responseJson;
    }
  }
  // Para verificar se o usuário já se logou e o token está armanzenado no localStorage
  useEffect(() => {
    const getToken = getData('token');
    fetchData(getToken)
      .then(response => { console.log(response) })
    // setToken(getToken);
  }, []);

  const submitLogin = async(e) => {
    e.preventDefault();
    let response = ''
    if (e.target.innerText === 'Login') {
      response = await login(userInfo);
    } else {
      response = await createUser(userInfo);
    }
    if (response.message) {
      const TIME_ERR = 5000;
      setErrorMsg(response.message);
      setTimeout(() => { setErrorMsg(''); }, TIME_ERR);
    } else {
      setToken(response.token);
      storeData('token', response.token);
    }
  };
  return (
    <div className="todo-container">
      {token && <Redirect to='/list' />}
      <h5 className="error-message">{errorMsg}</h5>
      <form>
        <ul className="todo-input">
          <li>
            <input 
              className="todo-input" 
              name="user"
              value={userInfo.user} 
              placeholder="Usuário"
              onChange={handleChange} 
              type="text" 
            />
          </li>
          <li>
            <input 
            className="todo-input" 
            name="password"
            value={userInfo.password} 
            placeholder="Senha"
            onChange={handleChange} 
            type="password" 
            />
          </li>
          <button 
            onClick={submitLogin}
            className="todo-button login-button" 
            type="submit">
              {pathname === '/cadastrar' ? 'Cadastrar' : 'Login'}
          </button>
          {pathname === '/cadastrar' 
            ? <Link className='back-link login-button' to="/">
                <button>
                  <i className="fas fa-undo-alt"></i>
                </button>
              </Link> 
            : <Link className='create-link login-button' to="/cadastrar">
                <button>
                  <i className="fas fa-user-plus"></i>
                </button>
              </Link> }
        </ul>
    </form> 
    </div>
  );
};

export default Authenticated;