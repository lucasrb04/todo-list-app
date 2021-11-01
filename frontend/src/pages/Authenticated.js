import React, { useEffect, useState } from 'react';
import './App.css';
import { login, createUser } from '../service/api';



import { getData, storeData } from '../helpers/localStorage';

const jwt = require('jsonwebtoken');

const Authenticated = ({todos, setTodos, filteredTodos}) => {

  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState({ user: '', password: '' });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo({
       [name]: value
    });
  };

  const fetchData = async(token) => {
    const secret = process.env.REACT_APP_JWT_SECRET;
    if (token) {
      const decoded = jwt.verify(token, secret);
      const { userInfo } = decoded;
      const response = await login(userInfo);
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    }
  }
  // Para verificar se o usuário já se logou e o token está armanzenado no localStorage
  useEffect(() => {
    const getToken = getData('token');
    setToken(getToken);
    fetchData(getToken);
  }, []);

  return (
    <div className="todo-container">
      <form>
      <input 
        className="todo-input" 
        name="user"
        value={userInfo.user} 
        onChange={handleChange} 
        type="text" 
      />
    </form> 

      <p>{token}</p>
    </div>
  );
};

export default Authenticated;