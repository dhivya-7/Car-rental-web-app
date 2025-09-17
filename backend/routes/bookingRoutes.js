const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

// ✅ Create booking + payment in one step
router.post("/", async (req, res) => {
  try {
    const {
      carId,
      carName,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      driverAge,
      promoCode,
      totalPrice,
      // payment fields
      fullName,
      email,
      address,
      city,
      state,
      zip,
      cardNumber,
      expMonth,
      expYear,
      cvv,
    } = req.body;

    // 1. Save booking
    const booking = new Booking({
      carId,
      carName,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      driverAge,
      promoCode,
      totalPrice,
    });
    await booking.save();

    // 2. Save payment linked to booking
    const payment = new Payment({
      fullName,
      email,
      address,
      city,
      state,
      zip,
      cardNumber,
      expMonth,
      expYear,
      cvv,
    });
    await payment.save();

    res.status(201).json({
      success: true,
      message: "Booking and payment saved successfully",
      booking,
      payment,
    });
  } catch (err) {
    console.error("❌ Booking+Payment error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Search available cars
router.post("/search", bookingController.searchBookings);

module.exports = router;
