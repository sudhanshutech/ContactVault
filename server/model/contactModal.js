const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    // mongoose schema is used to define the structure of the document
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema); // mongoose model is used to create a collection in the database

module.exports = Contact;
