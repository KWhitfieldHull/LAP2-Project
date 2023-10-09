const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", authenticator, userController.login);

module.exports = userRouter;