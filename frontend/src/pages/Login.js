import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import './App.css';

import { login, createUser } from '../service/api';
import { getData, storeData } from '../helpers/localStorage';
import Consumer from '../helpers/context/Consumer';

const jwt = require('jsonwebtoken');


const Login = ({todos, setTodos, filteredTodos}) => {
  const { pathname } = useLocation();

  const { userInfo, setUserInfo } = useContext(Consumer);

  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const errorMessage = (response) => {
    if (response.message) {
      const TIME_ERR = 5000;
      setErrorMsg(response.message);
      setTimeout(() => { setErrorMsg(''); }, TIME_ERR);
    } else {
      setToken(response.token);
      storeData('token', response.token);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo({
      ...userInfo,
       [name]: value
    });
  };

  const fetchData = async() => {
    // Procura se existe um token no localStorage
    const getToken = getData('token');
    // Pega o segredo no .env
    const secret = process.env.REACT_APP_JWT_SECRET;
    // Verifica se o token existe
    if (getToken) {
      // Se existir, verifica se o token é válido
      const decoded = jwt.verify(getToken, secret);
      const { user, password } = decoded;
      // Se o token for válido, é feito o login
      const response = await login({ user, password });
      // se o token for inválido, é lançado um erro,
      // se for válido, o token é validado novamente 
      // e o usuário é redirecionado para a página inicial
      errorMessage(response);
    }
  }
  // Para verificar se o usuário já se logou e o token está armanzenado no localStorage
  useEffect(() => {
    fetchData()
      .then(response => { console.log(response) })
  }, []);

  const submitLogin = async(e) => {
    e.preventDefault();
    let response = ''
    if (e.target.innerText === 'Login') {
      response = await login(userInfo);
    } else {
      response = await createUser(userInfo);
    }
    errorMessage(response);
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
            className="login-button" 
            type="submit">
              {pathname === '/cadastrar' ? 'Cadastrar' : 'Login'}
          </button>
          {pathname === '/cadastrar' 
            ? <Link className='create-link' to="/">
                <button>
                  <i className="fas fa-undo-alt"></i>
                </button>
              </Link> 
            : <Link className='create-link' to="/cadastrar">
                <button>
                  <i className="fas fa-user-plus"></i>
                </button>
              </Link> }
        </ul>
    </form> 
    </div>
  );
};

export default Login;