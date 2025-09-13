const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  title: String,
  text: String,
  rating: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
