const Car = require("../models/Car");

// Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate("supplierId", "name");
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a car
exports.addCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get single car
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("supplierId", "name");
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update car
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete car
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
