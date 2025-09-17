const Booking = require("../models/Booking");
const Car = require("../models/Car");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search available cars
exports.searchBookings = async (req, res) => {
  try {
    const { pickup, dropoff, pickupDate, pickupTime, dropoffDate, dropoffTime } = req.body;

    if (!pickup || !dropoff || !pickupDate || !dropoffDate) {
      return res.status(400).json({ message: "Pickup, drop-off, and dates are required" });
    }

    const pickupDateTime = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime || "23:59"}`);

    const bookedCars = await Booking.find({
      $or: [
        { pickupDate: { $lte: dropoffDateTime }, dropoffDate: { $gte: pickupDateTime } }
      ],
    }).select("carId");

    const bookedCarIds = bookedCars.map((b) => b.carId);
    const availableCars = await Car.find({ _id: { $nin: bookedCarIds } });

    res.json({ cars: availableCars, pickup, dropoff, pickupDate, dropoffDate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};