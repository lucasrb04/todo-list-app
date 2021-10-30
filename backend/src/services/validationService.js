const httpStatus = require('http-status');

const userExists = (existingUser) => {
  if (existingUser) {
    return {
      number: httpStatus.CONFLICT,
      error: {
        message: 'Usuário já está registrado.',
      },
    };
  }
};

const authenticatedLogin = (existingUser, password) => {
  if (!existingUser || existingUser.password !== password) {
    return {
      number: httpStatus.UNAUTHORIZED,
      error: {
        message: 'Usuário ou senha incorreta.',
      },
    };
  }
};

const listExists = (list) => {
  if (!list) {
    return {
      number: 404,
      error: {
        message: 'Lista não encontrada.',
      },
    };
  }
};

module.exports = {
  userExists,
  authenticatedLogin,
  listExists,
};