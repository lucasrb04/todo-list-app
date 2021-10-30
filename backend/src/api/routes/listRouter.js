const { Router } = require('express');

const { validate, authJWT } = require('../../middlewares');
const { listController } = require('../../controllers');

const listRouter = Router();

listRouter.get('/', authJWT, listController.getAllLists);
listRouter.post('/', authJWT, validate.createRecipe, listController.createList);
listRouter.get('/:id', authJWT, listController.getListById);
listRouter.put('/:id', authJWT, listController.updateList);
listRouter.delete('/:id', authJWT, listController.deleteList);

module.exports = { listRouter };
