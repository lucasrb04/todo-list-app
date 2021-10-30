const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const { userService } = require('../services');

const createUser = rescue(async (req, res, next) => {
  const { user, password } = req.body;

  const newUser = await userService.createUser(user, password);
  if (newUser.error) return next(newUser);

  return res.status(httpStatus.CREATED).json(newUser);
});

const login = rescue(async (req, res, next) => {
  const { user, password } = req.body;
  
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const loggedUser = await userService.login(user, password);

  if (loggedUser.error) return next(loggedUser);

  const token = jwt.sign(loggedUser, secret, jwtConfig);
  
  res.status(httpStatus.OK).json({ token });
});
module.exports = {
  createUser,
  login,
};
