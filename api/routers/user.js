const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/token", userController.showUserByToken);
userRouter.patch("/:id", userController.update);

module.exports = userRouter;