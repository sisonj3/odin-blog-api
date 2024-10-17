const commentController = require("../controllers/commentController");

const { Router } = require("express");

const commentRouter = Router();

// Read all comments
commentRouter.get("/read", commentController.readComments);

// Read all comments by author
commentRouter.get("/read/authorId/:authorId", commentController.readCommentsFromAuthor);

// Read comments from post
commentRouter.get("/read/postId/:postId", commentController.readCommentsFromPost);

// Read comment by id
commentRouter.get("/read/commentId/:commentId", commentController.readCommentById);

// Create comment
commentRouter.post("/create/:authorId/:postId", commentController.createComment);

// Update Comment
commentRouter.put("/update/:commentId", commentController.updateComment);

// Delete Comment
commentRouter.delete("/delete/:commentId", commentController.deleteComment);

module.exports = commentRouter;