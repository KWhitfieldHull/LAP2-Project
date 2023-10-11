const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const bidsController = require('../controllers/bids');

const bidsRouter = Router();

bidsRouter.get('/', bidsController.index);
bidsRouter.get('/:itemid', bidsController.showItemBid);
bidsRouter.get('/user/:userid', bidsController.showUserBid);
bidsRouter.patch('/bidsupdated', bidsController.bidHandler);
bidsRouter.post('/newbid', authenticator, bidsController.bidHandler);
// bidsRouter.patch('/:id', authenticator, bidsController.bidHandler);
bidsRouter.delete('/:itemid', authenticator, bidsController.deleteBid);


module.exports = bidsRouter;