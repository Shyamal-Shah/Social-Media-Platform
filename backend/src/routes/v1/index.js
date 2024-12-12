const express = require("express");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

// Auth Routes
router.use("/auth", require("./authRoutes"));

// Posts Routes
router.use("/posts", authenticate, require("./postRoutes"));

// Comments Routes
router.use("/posts/:postId/comments", authenticate, require("./commentRoutes"));

module.exports = router;
