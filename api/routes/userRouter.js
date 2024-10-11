const userController = require('../controllers/userController');

const { Router } = require('express');

const userRouter = Router();

// Create user
userRouter.post("/create", userController.createUser);

module.exports = fileRouter;