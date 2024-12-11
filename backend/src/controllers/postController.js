const { BadRequestError } = require("../utils/error");
const Post = require("../models/Post");
const { uploadFile } = require("../middleware/fileUpload");
const { convertErrors } = require("../middleware/errorHandler");

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    let imageUrl = null;

    if (!caption) {
      throw new BadRequestError("Caption is required.");
    }

    if (!req.file) {
      throw new BadRequestError("Image file is required");
    } else {
      imageUrl = await uploadFile(req.file);
    }

    const post = new Post({
      user: req.user._id,
      caption,
      imageUrl,
    });

    await post.save();

    res.status(201).json({ message: "Post created successfully.", post });
  } catch (error) {
    convertErrors(error, req, res);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isActive: true })
      .populate("user", "username email")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    convertErrors(error, req, res);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ _id: id, isActive: true });

    if (!post) {
      throw new BadRequestError("Post not found.");
    } else {
      post.isActive = false;
      await post.save();
      res.status(200).json({ message: "Post deleted successfully." });
    }
  } catch (error) {
    convertErrors(error, req, res);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;

    const post = await Post.findOne({ _id: id, isActive: true });

    if (!post) {
      throw new BadRequestError("Post not found.");
    } else {
      post.caption = caption;
      await post.save();
      res.status(200).json({ message: "Post updated successfully.", post });
    }
  } catch (error) {
    convertErrors(error, req, res);
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
