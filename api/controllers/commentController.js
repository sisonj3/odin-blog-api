const query = require("../prisma/queries");

// Read comments
const readComments = async (req, res) => {
    const comments = await query.readComments();

    return res.json(comments);
};

// Read all comments by author
const readCommentsFromAuthor = async (req, res) => {
    const comments = await query.readCommentsFromAuthor(Number(req.params.authorId));

    return res.json(comments);
};

// Read comments from post
const readCommentsFromPost = async (req, res) => {
    const comments = await query.readCommentsFromPost(Number(req.params.postId));

    return res.json(comments);
};

// Read comment by id
const readCommentById = async (req, res) => {
    const comment = await query.readCommentById(Number(req.params.commentId));

    return res.json(comment);
};

// Create comment
const createComment = async (req, res) => {
    await query.createComment(Number(req.params.authorId), Number(req.params.postId), req.body.text);

    return res.send("POST: Created comment!");
};

// Update Comment
const updateComment = async (req, res) => {
    await query.updateComment(Number(req.params.commentId), req.body.text);

    return res.send("PUT: Updated comment!");
};

// Delete Comment
const deleteComment = async (req, res) => {
    await query.deleteComment(Number(req.params.commentId));

    return res.send("DELETE: Deleted comment!");
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