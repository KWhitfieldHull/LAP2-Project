const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const recycleController = require('../controllers/recycle');

const recycleRouter = Router();

recycleRouter.post('/', authenticator, recycleController.index);


module.exports = recycleRouter;