const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true }, 
  rating: { type: Number, default: 4 },
});

module.exports = mongoose.model("Supplier", supplierSchema);
