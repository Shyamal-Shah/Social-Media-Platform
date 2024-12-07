const express = require("express");
const authController = require("../../controllers/authController");
const postController = require("../../controllers/postController");
const commentController = require("../../controllers/commentController");
const router = express.Router();

// Auth Routes
router.route("/auth/login").post(authController.loginUser);
router.route("/auth/register").post(authController.registerUser);

// Posts Routes
router
  .route("/posts")
  .get(postController.getPosts)
  .post(postController.createPost);

router
  .route("/posts/:id")
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

// Comments Routes
router
  .route("/posts/:postId/comments")
  .get(commentController.getComments)
  .post(commentController.createComment);
router
  .route("/comments/:id")
  .get(commentController.getComment)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
