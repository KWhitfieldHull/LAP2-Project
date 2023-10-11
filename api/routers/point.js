const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const pointController = require('../controllers/point')

const pointRouter = Router();

//admin and logged in
pointRouter.get('/', authenticator, pointController.showAllPoints);
pointRouter.patch('/resetpoints/:id', authenticator, pointController.resetPointsById)

//logged in 
pointRouter.get('/:id', authenticator, pointController.showPointsById);
pointRouter.patch('/:id', authenticator, pointController.gainPoint);
pointRouter.patch('/redeem/:id', authenticator, pointController.redeem);

module.exports = pointRouter;