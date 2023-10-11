const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user');
const itemsRouter = require('./routers/items');
const recycleRouter = require('./routers/recycle');
const categoryRouter = require('./routers/category');
const bidsRouter = require('./routers/bids');
//const pointRouter = require('./routers/point');


const api = express();

api.use(cors());
api.use(express.json({ limit: '100mb' }));

const bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


api.use("/users", userRouter);
api.use("/items", itemsRouter);
api.use("/recycle", recycleRouter);
api.use("/categories", categoryRouter);
api.use("/bids", bidsRouter);
//api.use("/account", pointRouter);


module.exports = api;


