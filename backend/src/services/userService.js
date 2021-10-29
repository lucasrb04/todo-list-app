const { userModel } = require('../models');
const validations = require('./validationService');

const createUser = async (name, email, password) => {
  const existingUser = await userModel.findByEmail(email);

  const isExist = validations.userExists(existingUser);

  if (isExist) return isExist;

  return userModel.create(name, email, password);
};

const login = async (email, password) => {
  const existingUser = await userModel.findByEmail(email);

  const isAuthenticated = validations.authenticatedLogin(existingUser, password);

  if (!isAuthenticated) {
    const { _id } = existingUser;
    return { userId: _id, email };
  }

  return isAuthenticated;
};

module.exports = {
  createUser,
  login,
};