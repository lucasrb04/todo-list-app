const express = require('express');
const bodyParser = require('body-parser');

const { error, validate, authJWT } = require('../middlewares');
const { userController, recipeController } = require('../controllers');
const { listRouter } = require('./routes/listRouter');

const app = express();

app.use(bodyParser.json());
// Não usado urlencoded , pois não há alteração na url.
// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', validate.createUser, userController.createUser);
app.post('/login', validate.login, userController.login);

app.use('/list', listRouter);

app.use(error);

module.exports = app;
