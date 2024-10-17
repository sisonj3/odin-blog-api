const query = require("../prisma/queries");

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