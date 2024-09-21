const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
  getUsers,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", validateToken, userProfile);

router.get("/", getUsers);

module.exports = router;
