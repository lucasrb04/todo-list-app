const { Router } = require('express');

const { validation, authJWT } = require('../../middlewares');
const { listController } = require('../../controllers');

const router = Router();
router.get('/', authJWT, listController.getAllLists);
router.post('/', authJWT, validation.validateList, listController.createList);
router.get('/:listId', authJWT, listController.getListById);
router.put('/:listId', authJWT, validation.validateList, listController.updateList);
router.delete('/:listId', authJWT, listController.deleteList);

module.exports = router;
