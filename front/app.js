const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");

const app = express();

// Routes
const loginRouter = require("./routes/loginRouter");
const postRouter = require("./routes/postRouter");

// Set up ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up passport session
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

// Used for req.body
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/login", loginRouter);
app.use("/posts", postRouter);

app.listen(4000, () => console.log("App listening on port 4000!"));