const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const { userService } = require('../services');

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(user, secret, jwtConfig);
  return token;
};
const createUser = rescue(async (req, res, next) => {
  const { user, password } = req.body;

  const newUser = await userService.createUser(user, password);
  if (newUser.error) return next(newUser);

  const token = generateToken(newUser);

  return res.status(httpStatus.CREATED).json({ token });
});

const login = rescue(async (req, res, next) => {
  const { user, password } = req.body;
  
  const loggedUser = await userService.login(user, password);

  if (loggedUser.error) return next(loggedUser);

  const token = generateToken(loggedUser);
  
  return res.status(httpStatus.OK).json({ token });
});

module.exports = {
  createUser,
  login,
};
