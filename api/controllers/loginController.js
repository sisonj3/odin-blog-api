const query = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const checkUser = (req, res) => {
    if (req.user) {
        return res.send(`${req.user.username} logged in!`);
    } else {
        return res.send("No user logged in!");
    }
}

// Set up LocalStrategy
passport.use(new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    
    try {
        const user = await query.getUserByUsername(username);

        // Clear messages
        req.session.messages = undefined;

        // Check if user exists
        if (!user) {
            return done(null, false, { message: "Username does not exist!" });
        }

        // Use bcrypt.compare to validate password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);

    } catch (error) {
        return done(error);
    }
})
);

// Serialization and Deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await query.getUserById(id);

        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Authenticate
const loginUser = passport.authenticate("local", {
    failureMessage: true,
});

const getJWT = (req, res) => {
    // Get user back w/ req.user
    console.log(req.user);

    // Get jsonwebtoken
    jwt.sign({ user: req.user }, process.env.SECRET, { expiresIn: '12h'}, (err, token) => {
        res.json({
            token: token,
            username: req.user.username,
            profile: req.user.profile,
        });
    });
};

const verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (bearerHeader) {
        
        const bearer = bearerHeader.split(' ');

        // Get token from array
        const bearerToken = bearer[1];

        // Set the token
        req.token = bearerToken;

        // Next middleware
        next();

    } else {
        // Forbidden
        res.sendStatus(403);
    };
};


module.exports = {
    checkUser,
    loginUser,
    getJWT,
    verifyToken,
}