const query = require("../prisma/queries");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

// Read comments
const readComments = async (req, res) => {
    const comments = await query.readComments();

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.json(comments);
        }
    });
};

// Read all comments by author
const readCommentsFromAuthor = async (req, res) => {
    const comments = await query.readCommentsFromAuthor(Number(req.params.authorId));

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.json(comments);
        }
    });
};

// Read comments from post
const readCommentsFromPost = async (req, res) => {
    const comments = await query.readCommentsFromPost(Number(req.params.postId));

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.json(comments);
        }
    });
};

// Read comment by id
const readCommentById = async (req, res) => {
    const comment = await query.readCommentById(Number(req.params.commentId));

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.json(comment);
        }
    });
};

// Create comment
const createComment = async (req, res) => {
    await query.createComment(Number(req.params.authorId), Number(req.params.postId), req.body.text);

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.send('POST: Created Comment!');
        }
    });
};

// Update Comment
const updateComment = async (req, res) => {
    await query.updateComment(Number(req.params.commentId), req.body.text);

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.send("PUT: Updated comment!");
        }
    });

    
};

// Delete Comment
const deleteComment = async (req, res) => {
    await query.deleteComment(Number(req.params.commentId));

    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            return res.send("DELETE: Deleted comment!");
        }
    });
};

module.exports = {
    readComments,
    readCommentsFromAuthor,
    readCommentsFromPost,
    readCommentById,
    createComment,
    updateComment,
    deleteComment,
}