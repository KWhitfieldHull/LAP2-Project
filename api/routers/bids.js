const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const bidsController = require('../controllers/bids');

const bidsRouter = Router();

bidsRouter.get('/', authenticator, bidsController.index);
bidsRouter.get('/:itemid', authenticator, bidsController.showItemBid);
bidsRouter.get('/:userid', authenticator, bidsController.showUserBid);
// bidsRouter.get('/bidplaced', authenticator, bidsController.bidHandler);
bidsRouter.patch('/bidsupdated', authenticator, bidsController.bidHandler);
bidsRouter.post('/newbid', authenticator, bidsController.bidHandler);
// bidsRouter.patch('/:id', authenticator, bidsController.bidHandler);
bidsRouter.delete('/:itemid', authenticator, bidsController.destroy);


module.exports = bidsRouter;