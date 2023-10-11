const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const categoryController = require('../controllers/category');

const categoryRouter = Router();

categoryRouter.get('/', authenticator, categoryController.index);
categoryRouter.get('/:id', authenticator, categoryController.show);

module.exports = categoryRouter;
