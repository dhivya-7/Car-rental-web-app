const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    carName: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    dropoffDate: { type: Date, required: true },
    dropoffTime: { type: String, required: true },
    driverAge: { type: Number, required: true },
    promoCode: { type: String },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("Booking", BookingSchema);
