const query = require('../prisma/queries');

// Read all posts
const readPosts = async (req, res) => {
    const posts = await query.readPosts();

    return res.json(posts);
};

// Read post by id
const readPostById = async (req, res) => {
    const post = await query.readPostById(Number(req.params.postId));

    return res.json(post);
};

// Create post
const createPost = async (req, res) => {
    await query.createPost(Number(req.params.profileId), req.body.title, req.body.text);

    return res.send('POST: Created Post!');
};

// Update post
const updatePost = async (req, res) => {
    await query.updatePost(Number(req.params.postId), req.body.title, req.body.text);

    return res.send('PUT: Updated Post!');
};

// Delete post
const deletePost = async (req, res) => {
    await query.deletePost(Number(req.params.postId));

    return res.send('DELETE: Deleted Post!');
};

module.exports = {
    readPosts,
    readPostById,
    createPost,
    updatePost,
    deletePost
};