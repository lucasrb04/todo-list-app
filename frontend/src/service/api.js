require('dotenv').config();

const URL_ENV = process.env.REACT_APP_API_URL;

const login = async (userObjInfo) => {
  const URL_TO_FETCH = URL_ENV + '/users/login';
  const response = await fetch(URL_TO_FETCH, {
    method: 'post', // opcional
    mode: 'cors', // opcional
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // The type of data you're sending
    },
    body: JSON.stringify({...userObjInfo}), // The data you're sending
  });
  const data = await response.json();
  return data;
};

const createUser = async (userObjInfo) => {
  const URL_TO_FETCH = URL_ENV + '/users/create';
  const response = await fetch(URL_TO_FETCH, {
    method: 'post', // opcional
    mode: 'cors', // opcional
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // The type of data you're sending
    },
    body: JSON.stringify(userObjInfo), // The data you're sending
  });
  const data = await response.json();
  return data;
};

const getAllLists = async (userObjInfo) => {
  const URL_TO_FETCH = URL_ENV + '/list';
  const response = await fetch(URL_TO_FETCH, {
    method: 'get', // opcional
    mode: 'cors', // opcional
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // The type of data you're sending
      'authorization': userObjInfo.token,
    },
  });
  const data = await response.json();
  return data;
};

const deleteList = async ({id, token}) => {
  const URL_TO_FETCH = URL_ENV + `/list/${id}`;
  const response = await fetch(URL_TO_FETCH, {
    method: 'delete', // opcional
    mode: 'cors', // opcional
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // The type of data you're sending
      'authorization': token,
    },
  });
  const data = await response.json();
  return data;
};

const createList = async ({token}) => {
  const URL_TO_FETCH = URL_ENV + '/list';
  const response = await fetch(URL_TO_FETCH, {
    method: 'post', // opcional
    mode: 'cors', // opcional
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // The type of data you're sending
      'authorization': token,
    },
    body: JSON.stringify({ name:'Nova lista', tasks: '' }), // The data you're sending
  });
  const data = await response.json();
  return data;
};

export { login, createUser, getAllLists, deleteList, createList };
