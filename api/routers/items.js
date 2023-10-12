const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const itemsController = require('../controllers/items');

const itemsRouter = Router();

itemsRouter.get('/', authenticator, itemsController.index);
itemsRouter.get('/:id', authenticator, itemsController.show);
itemsRouter.post('/newitem',authenticator, itemsController.create);
itemsRouter.patch('/:id', authenticator, itemsController.update);
itemsRouter.delete('/:id', authenticator, itemsController.destroy);
itemsRouter.get("/user/:id", authenticator, itemsController.showItemById)

module.exports = itemsRouter;
