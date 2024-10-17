const query = require("../prisma/queries");

const createUser = async (req, res) => {
    await query.createUser(req.body.username, req.body.password);

    return res.send('POST: Created User!');
};

const readUser = async (req, res) => {
    const users = await query.getUsers();

    return res.json(users);
}

const readUserByUsername = async (req, res) => {
    const user = await query.getUserByUsername(req.params.username);

    return res.json(user);
}

const updateUser = async (req, res) => {
    // Change body.id to params.id
    await query.updateUser(req.body.id, req.body.username, req.body.password);
    return res.send('PUT: Updated User!');
}

const deleteUser = async (req, res) => {
    // Change body.id to params.id
    await query.deleteUser(req.body.id);
    return res.send('DELETE: Deleted User!');
}

module.exports = {
    createUser,
    readUser,
    readUserByUsername,
    updateUser,
    deleteUser,
}