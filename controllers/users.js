const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// get all
const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  const result = await mongodb.getDatabase().db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

// get single
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .findOne({ _id: userId });

  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// create new
const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    height: req.body.height,
    age: req.body.age,
    email: req.body.email,
    city: req.body.city,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while trying to update a user!");
  }
};

// update existing
const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    height: req.body.height,
    age: req.body.age,
    email: req.body.email,
    city: req.body.city,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while trying to update a user!");
  }
};

// delete existing
const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error occured while trying to delete user!");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
