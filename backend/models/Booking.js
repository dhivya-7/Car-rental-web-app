const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", default: null },
  carName: { type: String, default: null },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  dropoffDate: { type: Date, required: true },
  dropoffTime: { type: String, required: true },
  driverAge: { type: Number },
  promoCode: { type: String },
  totalPrice: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
