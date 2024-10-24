const loginController = require("../controllers/loginController");

const { Router } = require("express");

const loginRouter = Router();

// Render login page
loginRouter.get("/", loginController.renderLogin);

// Log in user
loginRouter.post("/", [loginController.loginUser, (req, res) => {console.log(req.user)}]);

module.exports = loginRouter;