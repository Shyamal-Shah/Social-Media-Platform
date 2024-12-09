const { convertErrors } = require("../middleware/errorHandler");
const { BadRequestError } = require("../utils/error");
const { v4: uuidv4 } = require("uuid");
const Post = require("../models/Post");

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    if (!comment) {
      throw new BadRequestError("Comment is required.");
    }

    const post = await Post.findOne({ _id: postId, isActive: true });
    if (!post) {
      throw new BadRequestError("Post not found.");
    } else {
      post.comments.push({
        user: req.user._id,
        comment,
        id: uuidv4(),
      });
      await post.save();
      res.status(201).json({ message: "Comment created successfully.", post });
    }
  } catch (error) {
    convertErrors(error, req, res);
  }
};

const updateComment = async (req, res) => {
  try {
    const { postId, id } = req.params;

    const post = await Post.findOne({ _id: postId, isActive: true });

    if (!post) {
      throw new BadRequestError("Post not found.");
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) {
      throw new BadRequestError("Comment not found.");
    }
    post.comments[commentIndex].comment = req.body.comment;
    await post.save();
  } catch (error) {
    convertErrors(error, req, res);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, id } = req.params;

    const post = await Post.findOne({ _id: postId, isActive: true });

    if (!post) {
      throw new BadRequestError("Post not found.");
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) {
      throw new BadRequestError("Comment not found.");
    }
    post.comments.splice(commentIndex, 1);
    await post.save();
    res.status(200).json({ message: "Comment deleted successfully.", post });
  } catch (error) {
    convertErrors(error, req, res);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
