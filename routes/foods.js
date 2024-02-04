const router = require("express").Router();

const foodsController = require("../controllers/foods");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", foodsController.getAllFood);
router.get("/:id", foodsController.getSingleFood);
router.post("/", isAuthenticated, foodsController.createFood);
router.put("/:id", isAuthenticated, foodsController.updateFood);
router.delete("/:id", isAuthenticated, foodsController.deleteFood);

module.exports = router;
