const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const pointController = require('../controllers/point')

const pointRouter = Router();

//admin and logged in
pointRouter.get('/', pointController.showAllPoints);
pointRouter.patch('/resetpoints/:id', pointController.resetPointsById)

//logged in 
pointRouter.get('/:id', pointController.showPointsById);
pointRouter.patch('/:id', pointController.gainPoint);
pointRouter.patch('/redeem/:id', pointController.redeem);

module.exports = pointRouter;