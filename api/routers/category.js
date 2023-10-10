const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const categoryController = require('../controllers/category');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.index);
categoryRouter.get('/:id', categoryController.show);

module.exports = categoryRouter;
