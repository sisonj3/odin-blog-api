const loginController = require("../controllers/loginController");

const { Router } = require("express");

const loginRouter = Router();

loginRouter.post("/", [loginController.loginUser, loginController.getJWT]);

module.exports = loginRouter;