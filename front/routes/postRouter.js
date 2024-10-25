const postController = require('../controllers/postController');

const { Router } = require('express');

const postRouter = Router();

// Render posts page
postRouter.get("/", postController.renderPosts);

module.exports = postRouter;