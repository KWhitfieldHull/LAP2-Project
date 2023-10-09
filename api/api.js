const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user');
const itemsRouter = require('./routers/items');
const pointRouter = require('./routers/point');

const api = express();

api.use(cors());
api.use(express.json());

api.use("/users", userRouter);
api.use("/items", itemsRouter);
api.use("/account", pointRouter);

module.exports = api;