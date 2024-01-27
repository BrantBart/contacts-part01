const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .findOne({ _id: contactId });

  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
};

const saveContact = async (req, res) => {
  const newContact = req.body;

  try {
    const result = await mongodb.saveContact(newContact);
    res.status(201).json({ message: "Contact created successfully", contact: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving contact" });
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });

  if (result.deletedCount === 1) {
    res.status(200).json({ message: "Contact deleted successfully" });
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
};

module.exports = {
  getAll,
  getSingle,
  saveContact,
  deleteContact,
};