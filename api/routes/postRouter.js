const postController = require("../controllers/postController");
const loginController = require("../controllers/loginController");

const { Router } = require("express");

const postRouter = Router();

// Read posts
postRouter.get("/read", [loginController.verifyToken, postController.readPosts]);

// Read posts by id
postRouter.get("/read/:postId", [loginController.verifyToken, postController.readPostById]);

// Create post
postRouter.post("/create/:profileId", [loginController.verifyToken, postController.createPost]);

// Update post
postRouter.put("/update/:postId", [loginController.verifyToken, postController.updatePost]);

// Delete post
postRouter.delete("/delete/:postId", [loginController.verifyToken, postController.deletePost]);

module.exports = postRouter;