const Newsletter = require("../models/Newsletter");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "This email is already subscribed." });
    }

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
