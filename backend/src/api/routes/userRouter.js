const { Router } = require('express');

const { validation } = require('../../middlewares');
const { userController } = require('../../controllers');

const router = Router();
router.post('/create', validation.validateUser, userController.createUser);
router.post('/login', validation.validateUser, userController.login);

module.exports = router;
