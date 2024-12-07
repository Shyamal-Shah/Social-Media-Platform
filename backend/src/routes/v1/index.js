const express = require("express");
const authController = require("../../controllers/authController");
const postController = require("../../controllers/postController");
const commentController = require("../../controllers/commentController");
const router = express.Router();
const authenticate = require("../../middleware/authMiddleware");

// Auth Routes
router.route("/auth/login").post(authController.loginUser);
router.route("/auth/register").post(authController.registerUser);

// Posts Routes
router
  .route("/posts")
  .get(authenticate, postController.getPosts)
  .post(authenticate, postController.createPost);

router
  .route("/posts/:id")
  .get(authenticate, postController.getPost)
  .put(authenticate, postController.updatePost)
  .delete(authenticate, postController.deletePost);

// Comments Routes
router
  .route("/posts/:postId/comments")
  .get(authenticate, commentController.getComments)
  .post(authenticate, commentController.createComment);
router
  .route("/comments/:id")
  .get(authenticate, commentController.getComment)
  .put(authenticate, commentController.updateComment)
  .delete(authenticate, commentController.deleteComment);

module.exports = router;
