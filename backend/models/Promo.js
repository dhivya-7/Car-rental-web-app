const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: Number,
  expiry: Date
}, { timestamps: true });

module.exports = mongoose.model("Promo",promoSchema);