const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

// Router constants

// Set up passport session

// Used for req.body
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/", (req, res) => { res.send("Hello, World!") });

app.listen(3000, () => console.log("App listening on port 3000!"));