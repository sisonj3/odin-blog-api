const query = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Set up LocalStrategy

const loginUser = (req, res) => {
    console.log("Logging in user...");

    // Authenticate

    // Get user back

    // Get jsonwebtoken

    return res.send("User logged in!");
};

module.exports = {
    loginUser,
}