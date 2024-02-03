const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// get all
const getAllFood = async (req, res) => {
  //#swagger.tags=['Foods']
  const result = await mongodb.getDatabase().db().collection("foods").find();
  result.toArray().then((foods) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(foods);
  });
};

// get single
const getSingleFood = async (req, res) => {
  //#swagger.tags=['Foods']
  const foodId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("foods")
    .findOne({ _id: foodId });

  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: "Food not found" });
  }
};

// create new
const createFood = async (req, res) => {
  //#swagger.tags=['Foods']
  const food = {
    name: req.body.name,
    meal: req.body.meal,
    flavor: req.body.flavor,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("foods")
    .insertOne(food);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while trying to update a food!");
  }
};

// update existing
const updateFood = async (req, res) => {
  //#swagger.tags=['Foods']
  const foodId = new ObjectId(req.params.id);
  const food = {
    name: req.body.name,
    meal: req.body.meal,
    flavor: req.body.flavor,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("foods")
    .replaceOne({ _id: foodId }, food);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while trying to update a food!");
  }
};

// delete existing
const deleteFood = async (req, res) => {
  //#swagger.tags=['Foods']
  const foodId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("foods")
    .deleteOne({ _id: foodId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error occured while trying to delete food!");
  }
};

module.exports = {
  getAllFood,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood,
};
