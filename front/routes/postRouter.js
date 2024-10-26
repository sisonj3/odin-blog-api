const postController = require('../controllers/postController');

const { Router } = require('express');

const postRouter = Router();

// Render posts page
postRouter.get("/", postController.renderPosts);

// Render create post page
postRouter.get("/create", postController.renderCreatePost);

// Add post to db
postRouter.post("/create", postController.createPost);

module.exports = postRouter;