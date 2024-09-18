const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    // mongoose schema is used to define the structure of the document
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"]
    },
    password: {
      type: String,
      required: [true, "Please provide a password"]
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); // mongoose model is used to create a collection in the database

module.exports = User;