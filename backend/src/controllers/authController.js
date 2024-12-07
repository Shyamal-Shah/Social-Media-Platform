const registerUser = async (req, res) => {
  throw new Error("Error");
  res.json({ message: "Register" });
};

const loginUser = async (req, res) => {
  res.json({ message: "Login" });
};

module.exports = {
  registerUser,
  loginUser,
};
