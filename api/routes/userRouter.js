const userController = require('../controllers/userController');

const { Router } = require('express');

const userRouter = Router();

// Create user
userRouter.post("/create", userController.createUser);

// Read users
userRouter.get("/read", userController.readUser);

// Read user with id
userRouter.get("/read/:userId", userController.readUserById);

// Update user
userRouter.put('/update', userController.updateUser);

// Delete user
userRouter.delete('/delete', userController.deleteUser);

module.exports = userRouter;