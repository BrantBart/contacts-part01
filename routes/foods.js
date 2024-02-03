const router = require("express").Router();
const foodsController = require("../controllers/foods");

router.get("/", foodsController.getAllFood);
router.get("/:id", foodsController.getSingleFood);
router.post("/", foodsController.createFood);
router.put("/:id", foodsController.updateFood);
router.delete("/:id", foodsController.deleteFood);

module.exports = router;
