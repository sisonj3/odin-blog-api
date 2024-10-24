const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const renderLogin = (req, res) => {
    
    // If no user is logged in
    if (!req.user) {
        // If there are errors display them
        if (req.session.messages) {
            res.render("login", { errors: req.session.messages, });
        } else {
            res.render("login");
        }
    } else {
        console.log("A user is already logged in!");
    }
};

// Setting up LocalStrategy
passport.use(new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    
    // Clear messages
    req.session.messages = undefined;
    
    // Get JWT from API
    fetch('http://localhost:3000/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.token);
            return done(null, data);
        })
        .catch(error => { 
            console.error(error);

            return done(null, false, { message: "Username and/or password is incorrect!" });
        });
})
);

// Serialization and Deserialization
passport.serializeUser((user, done) => {
    console.log("Serializing User...");
    console.log(user);
    done(null, user.token);
});

passport.deserializeUser(async (token, done) => {
    console.log("Deserializing User...");
    console.log(token);
    // Get user
})

const loginUser = passport.authenticate("local", {
    successRedirect: "/login",
    failureMessage: true,
});

module.exports = {
    renderLogin,
    loginUser,
}
