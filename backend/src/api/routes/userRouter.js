const { Router } = require('express');

const { validation } = require('../../middlewares');
const { userController } = require('../../controllers');

const router = Router();

router.post('/users', validation.validateUser, userController.createUser);
router.post('/login', validation.validateUser, userController.login);

module.exports = { router };
