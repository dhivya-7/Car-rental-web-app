const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/create", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({
      success: true,
      message: "Booking created successfully!",
      data: booking
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all bookings
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
