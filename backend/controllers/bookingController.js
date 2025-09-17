const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

function maskCard(card) {
  if (!card) return "**** **** **** ****";
  const digits = card.replace(/\s+/g, "");
  const last4 = digits.slice(-4);
  return "**** **** **** " + last4;
}

exports.createBooking = async (req, res) => {
  try {
    const {
      carId, carName,
      pickupLocation, dropoffLocation,
      pickupDate, pickupTime,
      dropoffDate, dropoffTime,
      driverAge, promoCode, totalPrice,
      // payment fields
      fullName, email, address, city, state, zip,
      cardNumber, expMonth, expYear, cvv, amount
    } = req.body;

    const booking = new Booking({
      carId, carName,
      pickupLocation, dropoffLocation,
      pickupDate, pickupTime,
      dropoffDate, dropoffTime,
      driverAge, promoCode, totalPrice,
    });

    const savedBooking = await booking.save();

    let savedPayment = null;
    if (fullName || amount) {
      const payment = new Payment({
        fullName,
        email,
        address,
        city,
        state,
        zip,
        amount: amount || totalPrice || 0,
        bookingId: savedBooking._id,
        cardNumber: cardNumber ? maskCard(cardNumber) : "**** **** **** ****",
        expMonth: expMonth || "XX",
        expYear: expYear || "XX",
        cvv: "***",
      });
      savedPayment = await payment.save();
    }

    res.status(201).json({ success: true, booking: savedBooking, payment: savedPayment });
  } catch (err) {
    console.error("createBooking error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const removed = await Booking.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.searchBookings = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, pickupDate, dropoffDate } = req.body;
    const filter = {};
    if (pickupLocation) filter.pickupLocation = { $regex: pickupLocation, $options: "i" };
    if (dropoffLocation) filter.dropoffLocation = { $regex: dropoffLocation, $options: "i" };
    if (pickupDate) filter.pickupDate = pickupDate;
    if (dropoffDate) filter.dropoffDate = dropoffDate;

    const results = await Booking.find(filter);
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
