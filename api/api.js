const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')

const userRouter = require('./routers/user');
const itemsRouter = require('./routers/items');
const pointRouter = require('./routers/point');

const api = express();

api.use(cors());
api.use(express.json());
api.use(fileUpload({
    defCharset: 'utf16',
    defParamCharset: 'utf16'
}));
api.use(bodyParser.urlencoded({ extended: false }))

api.use("/users", userRouter);
api.use("/items", itemsRouter);
api.use("/account", pointRouter);

module.exports = api;