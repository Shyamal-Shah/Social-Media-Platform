const getComments = async (req, res) => {
  res.json({ message: "Comments" });
};
const createComment = async (req, res) => {
  res.json({ message: "Create Comment" });
};

const getComment = async (req, res) => {
  res.json({ message: "Comment" });
};
const updateComment = async (req, res) => {
  res.json({ message: "Update Comment" });
};
const deleteComment = async (req, res) => {
  res.json({ message: "Delete Comment" });
};

module.exports = {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
