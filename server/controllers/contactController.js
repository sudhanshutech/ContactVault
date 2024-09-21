/*
 Handle the contact creation, updation, deletion and fetching contacts
*/

const asynHandler = require("express-async-handler"); // use of this package is to handle errors in async functions
const Contact = require("../model/contactModal");

// @desc get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asynHandler(async (req, res) => {
  const contact = await Contact.find({
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

// @desc create a contact
// @route POST /api/contacts
// @access Private
const createContact = asynHandler(async (req, res) => {
  console.log("Request body", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

// @desc get a contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc update a contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedContact);
});

// @desc delete a contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this contact");
  }
  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json();
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
