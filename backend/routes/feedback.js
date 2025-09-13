const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks); // always return an array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new feedback
router.post("/", async (req, res) => {
  try {
    const { rating, title, name, text } = req.body;
    if (!rating || !title || !name || !text) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const feedback = new Feedback({ rating, title, name, text });
    await feedback.save();
    res.json({ message: "Feedback saved!", feedback });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
