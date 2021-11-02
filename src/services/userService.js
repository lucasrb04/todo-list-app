const { userModel } = require('../models');
const validations = require('./validationService');

const createUser = async (user, password) => {
  // Busca no banco o usuário com os dados informados
  const existingUser = await userModel.findByUser(user);
  // Verifica se o usuário existe
  const isExist = validations.userExists(existingUser);
  // Caso o usuário exista, um erro é retornado
  if (isExist) return isExist;
  // Caso não tenha nenhum error, cria o usuário
  return userModel.createUser(user, password);
};

const login = async (user, password) => {
  // Busca no banco o usuário com os dados informados
  const existingUser = await userModel.findByUser(user);
  // Verifica se o usuário existe e se sua senha está correta
  const isNotAuthenticated = validations.authenticatedLogin(existingUser, password);
  // Caso não tenha nenhum error, retorna o usuário
  if (!isNotAuthenticated) {
    const { _id } = existingUser;
    return { userId: _id, user, password };
  }
  // Caso tenha um erro, retorna o erro.
  return isNotAuthenticated;
};

module.exports = {
  createUser,
  login,
};