const express = require("express");
const path = require("node:path");

const app = express();

// Routes
const loginRouter = require("./routes/loginRouter");

// Set up ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Used for req.body
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/login", loginRouter);

app.listen(4000, () => console.log("App listening on port 4000!"));