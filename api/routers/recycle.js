const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const recycleController = require('../controllers/recycle');

const recycleRouter = Router();

recycleRouter.get('/', recycleController.index);


module.exports = recycleRouter;