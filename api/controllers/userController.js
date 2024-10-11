const createUser = (req, res) => {
    return res.send('POST: Creating User!');
};

const readUser = (req, res) => {
    return res.send('GET: Reading User!')
}

const updateUser = (req, res) => {
    return res.send('PUT: Updating User!');
}

const deleteUser = (req, res) => {
    return res.send('DELETE: Deleting User!');
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
}