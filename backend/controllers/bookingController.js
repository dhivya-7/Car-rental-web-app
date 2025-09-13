const Booking = require("../models/Booking");
const Car = require("../models/Car");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      pickupDate: new Date(req.body.pickupDate),
      dropoffDate: new Date(req.body.dropoffDate),
    });

    console.log("Booking saved:", booking);
    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking save error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Search available cars
exports.searchBookings = async (req, res) => {
  try {
    const { pickupDate, pickupTime, dropoffDate, dropoffTime } = req.body;
    const pickupDateTime = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime || "23:59"}`);

    const bookedCars = await Booking.find({
      $or: [
        { pickupDate: { $lte: dropoffDateTime }, dropoffDate: { $gte: pickupDateTime } }
      ],
    }).select("carId");

    const bookedCarIds = bookedCars.map(b => b.carId);
    const availableCars = await Car.find({ _id: { $nin: bookedCarIds } });

    res.json({ cars: availableCars });
  } catch (err) {
    console.error("Booking search error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
