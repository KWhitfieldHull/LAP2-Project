const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const itemsController = require('../controllers/items');

const itemsRouter = Router();

itemsRouter.get('/', itemsController.index);
itemsRouter.get('/:id', itemsController.show);
itemsRouter.post('/newitem', itemsController.create);
itemsRouter.patch('/:id', itemsController.update);
itemsRouter.delete('/:id', itemsController.destroy);

module.exports = itemsRouter;