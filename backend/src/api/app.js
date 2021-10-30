const express = require('express');
const bodyParser = require('body-parser');

const { error } = require('../middlewares');
const { listRouter, userRouter } = require('./routes');

const app = express();
app.use(bodyParser.json());
// Não usado urlencoded , pois não há alteração na url.
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/list', listRouter);

app.use(error);

module.exports = app;
