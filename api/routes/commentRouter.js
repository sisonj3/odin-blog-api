const commentController = require("../controllers/commentController");
const loginController = require("../controllers/loginController");

const { Router } = require("express");

const commentRouter = Router();

// Read all comments
commentRouter.get("/read", [loginController.verifyToken, commentController.readComments]);

// Read all comments by author
commentRouter.get("/read/authorId/:authorId", [loginController.verifyToken, commentController.readCommentsFromAuthor]);

// Read comments from post
commentRouter.get("/read/postId/:postId", [loginController.verifyToken, commentController.readCommentsFromPost]);

// Read comment by id
commentRouter.get("/read/commentId/:commentId", [loginController.verifyToken, commentController.readCommentById]);

// Create comment
commentRouter.post("/create/:authorId/:postId", [loginController.verifyToken, commentController.createComment]);

// Update Comment
commentRouter.put("/update/:commentId", [loginController.verifyToken, commentController.updateComment]);

// Delete Comment
commentRouter.delete("/delete/:commentId", [loginController.verifyToken, commentController.deleteComment]);

module.exports = commentRouter;