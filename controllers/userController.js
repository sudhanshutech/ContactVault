/*
 Handle the user registration, login and user profile
*/

const asynHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");
const User = require("../model/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const userAvilaibility = await User.findOne({ email });
  if (userAvilaibility) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesToken = token.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ accesToken });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({ message: "Login a user" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const userProfile = asynHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, userProfile };
