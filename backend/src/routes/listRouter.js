const { Router } = require('express');

// const { validate, authJWT } = require('../middlewares');
// const { listController } = require('../controllers');
// const { listRouter } = require('./routes/listRouter');

const router = Router();

router.get('/', authJWT, listController.getAllLists);
router.post('/', authJWT, validate.createRecipe, listController.createList);
router.get('/:id', authJWT, listController.getListById);
router.put('/:id', authJWT, listController.updateList);
router.delete('/:id', authJWT, listController.deleteList);

module.exports = { listRouter };
