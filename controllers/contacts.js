const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// get all
const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

// get single
const getSingle = async (req, res) => {
  console.log("test worked");
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

// create new
const createContact = async (req,res) => {
const contact = {
  firstName: req.body.firstName,
  lastName: req.body.firstName,
  email: req.body.firstName,
  favoriteColor: req.body.firstName,
  birthday: req.body.firstName
};
}


const createsContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error occured while trying to create contact!");
  }
};

// update existing
const updateContact = async (req, res) => {
  const contactId = new ObjectID(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while trying to update a contact!");
  }
};

// delete existing
const deleteContact = async (req, res) => {
  const contactId = new ObjectID(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .remove({ _id: contactId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error occured while trying to delete contact!");
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
