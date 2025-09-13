const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, 
  seats: { type: Number, required: true },
  fuel: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "fallback-car.jpg" },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);
