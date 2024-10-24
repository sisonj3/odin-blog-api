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
        res.send(`${req.user.username} is already logged in with token: ${req.user.token}!`);
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
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    console.log("Deserializing User...");

    // Get user
    fetch(`http://localhost:3000/user/read/${user.username}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'authorization': `Bearer ${user.token}`
        },

    })
        .then(response => response.json())
        .then(data => {
            done(null, {
                id: data.id,
                username: data.username,
                token: user.token,
            });
        })
        .catch(error => {
            console.error(error);
            done(error);
        });
})

const loginUser = passport.authenticate("local", {
    successRedirect: "/login",
    failureMessage: true,
});

module.exports = {
    renderLogin,
    loginUser,
}
