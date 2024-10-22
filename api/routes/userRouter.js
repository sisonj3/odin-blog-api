const userController = require('../controllers/userController');
const loginController = require("../controllers/loginController");

const { Router } = require('express');

const userRouter = Router();

// Create user
userRouter.post("/create", userController.createUser);

// Read users
userRouter.get("/read", userController.readUser);

// Read user with id
userRouter.get("/read/:username", [loginController.verifyToken, userController.readUserByUsername]);

// Read user profile
userRouter.get("/read/:userId/profile", userController.readUserProfile);

// Update user
userRouter.put('/update/:userId', userController.updateUser);

// Delete user
userRouter.delete('/delete/:userId', userController.deleteUser);

module.exports = userRouter;