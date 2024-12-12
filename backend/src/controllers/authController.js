const { convertErrors } = require("../middleware/errorHandler");
const User = require("../models/User");
const { BadRequestError, NotFoundError } = require("../utils/error");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger")(module.filename);

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new BadRequestError("Please provide all required fields.");
    }

    let userInDB = await User.findOne({
      email,
    });

    if (userInDB) {
      throw new BadRequestError(
        "The user with this email already exists. Please login."
      );
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse, token });
  } catch (err) {
    convertErrors(err, req, res);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password.");
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      throw new NotFoundError(
        "The user with this email does not exist. Please register."
      );

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      throw new BadRequestError("Invalid credentials. Please try again.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({ user: { ...userResponse }, token });
  } catch (error) {
    convertErrors(error, req, res);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
