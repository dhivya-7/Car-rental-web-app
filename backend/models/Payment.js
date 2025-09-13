const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  cardNumber: String, //in real apps never store raw card data!
  expMonth: String,
  expYear: String,
  cvv: String,        // mask or tokenize in production
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);


