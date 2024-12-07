const createPost = async (req, res) => {
  res.json({ message: "Create Post" });
};
const getPosts = async (req, res) => {
  res.json({ message: "Posts" });
};
const getPost = async (req, res) => {
  res.json({ message: "Post" });
};
const deletePost = async (req, res) => {
  res.json({ message: "Delete Post" });
};
const updatePost = async (req, res) => {
  res.json({ message: "Update Post" });
};
module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
};