const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv").config();

const app = express();

// Router constants
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const loginRouter = require('./routes/loginRouter');

// Set up passport session
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

// Used for req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
//app.use("/", (req, res) => { return res.send("Hello, World!") });
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/login", loginRouter);

app.listen(3000, () => console.log("App listening on port 3000!"));