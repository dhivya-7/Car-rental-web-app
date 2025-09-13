const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", carController.getCars);
router.post("/", carController.addCar);
router.get("/:id", carController.getCar);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
