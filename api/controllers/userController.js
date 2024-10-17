const query = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// Validate user
const validate = [
    body("username").custom(async value => {
        const user = await query.getUserByUsername(value);

        if (user) {
            throw new Error('Username already in use');
        }
    }),
];

const createUser = [validate, async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }

    // Bcrypt password
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        await query.createUser(req.body.username, hashedPassword);
    });
    

    return res.send('POST: Created User!');
}
];

const readUser = async (req, res) => {
    const users = await query.getUsers();

    return res.json(users);
}

const readUserByUsername = async (req, res) => {
    const user = await query.getUserByUsername(req.params.username);

    return res.json(user);
}

const readUserProfile = async (req, res) => {
    const profile = await query.readProfile(Number(req.params.userId));

    return res.json(profile);
};

const updateUser = async (req, res) => {
    await query.updateUser(Number(req.params.userId), req.body.username, req.body.password);
    return res.send('PUT: Updated User!');
}

const deleteUser = async (req, res) => {
    await query.deleteUser(Number(req.params.userId));
    return res.send('DELETE: Deleted User!');
}

module.exports = {
    createUser,
    readUser,
    readUserByUsername,
    readUserProfile,
    updateUser,
    deleteUser,
}