const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user');
const itemsRouter = require('./routers/items');

const api = express();

api.use(cors());
api.use(express.json({ limit: '50mb' }));

const bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


api.use("/users", userRouter);
api.use("/items", itemsRouter);

module.exports = api;