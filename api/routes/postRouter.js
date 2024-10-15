const postController = require("../controllers/postController");

const { Router } = require("express");

const postRouter = Router();

// Read posts
postRouter.get("/read", postController.readPosts);

// Read posts by id
postRouter.get("/read/:postId", postController.readPostById);

// Create post
postRouter.post("/create/:profileId", postController.createPost);

// Update post
postRouter.put("/update/:postId", postController.updatePost);

// Delete post
postRouter.delete("/delete/:postId", postController.deletePost);

module.exports = postRouter;