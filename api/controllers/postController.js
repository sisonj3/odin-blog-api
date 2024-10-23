const query = require('../prisma/queries');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

// Read all posts
const readPosts = async (req, res) => {
    const posts = await query.readPosts();

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.json(posts);
        }
    });
};

// Read post by id
const readPostById = async (req, res) => {
    const post = await query.readPostById(Number(req.params.postId));

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.json(post);
        }
    });
};

// Create post
const createPost = async (req, res) => {
    await query.createPost(Number(req.params.profileId), req.body.title, req.body.text);

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.send('POST: Created Post!');
        }
    });

};

// Update post
const updatePost = async (req, res) => {
    await query.updatePost(Number(req.params.postId), req.body.title, req.body.text);

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.send('PUT: Updated Post!');
        }
    });

};

// Delete post
const deletePost = async (req, res) => {
    await query.deletePost(Number(req.params.postId));

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.send('DELETE: Deleted Post!');
        }
    });

};

module.exports = {
    readPosts,
    readPostById,
    createPost,
    updatePost,
    deletePost
};