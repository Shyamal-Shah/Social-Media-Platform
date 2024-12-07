const registerUser = async (req, res) => {
  res.jon({ message: "Register" });
};

const loginUser = async (req, res) => {
  res.json({ message: "Login" });
};

module.exports = {
  registerUser,
  loginUser,
};
