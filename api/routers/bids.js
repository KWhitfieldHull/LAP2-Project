const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const bidsController = require('../controllers/bids');
const bidsRouter = Router();

bidsRouter.get('/', bidsController.index);
bidsRouter.get('/:itemid', bidsController.showItemBid);
bidsRouter.get('/user/:userid', bidsController.showUserBid);
bidsRouter.patch('/bidsupdated', bidsController.bidHandler);

module.exports = bidsRouter;
