const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  zip: String,
  cardNumber: { type: String, default: "**** **** **** ****" }, // masked
  expMonth: { type: String, default: "XX" },
  expYear: { type: String, default: "XX" },
  cvv: { type: String, default: "***" },
  amount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
