const userController = require('../controllers/userController');
const loginController = require("../controllers/loginController");

const { Router } = require('express');

const userRouter = Router();

// Create user
userRouter.post("/create", userController.createUser);

// Read users
userRouter.get("/read", [loginController.verifyToken, userController.readUser]);

// Read user with id
userRouter.get("/read/:username", [loginController.verifyToken, userController.readUserByUsername]);

// Read user profile
userRouter.get("/read/:userId/profile", [loginController.verifyToken, userController.readUserProfile]);

// Update user
userRouter.put('/update/:userId', [loginController.verifyToken, userController.updateUser]);

// Delete user
userRouter.delete('/delete/:userId', [loginController.verifyToken, userController.deleteUser]);

module.exports = userRouter;