const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const pointController = require('../controllers/point')

const pointRouter = Router();

//admin and logged in
pointRouter.get('/', pointController.showAllPoints);

//logged in 
pointRouter.get('/:id', pointController.showPointsById);

module.exports = pointRouter;