const express = require("express");
const authController = require("../../controllers/authController");
const postController = require("../../controllers/postController");
const commentController = require("../../controllers/commentController");
const router = express.Router();
const authenticate = require("../../middleware/authMiddleware");
const { uploadMiddleware } = require("../../middleware/fileUpload");

// Auth Routes
router.route("/auth/login").post(authController.loginUser);
router.route("/auth/register").post(authController.registerUser);

// Posts Routes
router
  .route("/posts")
  .get(authenticate, postController.getPosts)
  .post(
    authenticate,
    uploadMiddleware.single("image"),
    postController.createPost
  );

router
  .route("/posts/:id")
  .put(authenticate, postController.updatePost)
  .delete(authenticate, postController.deletePost);

// Comments Routes
router
  .route("/posts/:postId/comments")
  .post(authenticate, commentController.createComment);
router
  .route("/posts/:postId/comments/:id")
  .put(authenticate, commentController.updateComment)
  .delete(authenticate, commentController.deleteComment);

module.exports = router;
