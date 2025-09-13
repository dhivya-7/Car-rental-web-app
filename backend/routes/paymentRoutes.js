const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Save payment after Stripe checkout success
router.post("/save", async (req, res) => {
  try {
    const { fullName, email, address, city, state, zip, amount } = req.body;

    const payment = new Payment({
      fullName,
      email,
      address,
      city,
      state,
      zip,
      amount, // ✅ also save amount
      cardNumber: "**** **** **** ****", // masked for security
      expMonth: "XX",
      expYear: "XX",
      cvv: "***",
      createdAt: new Date(),
    });

    await payment.save();

    res.json({ success: true, message: "Payment saved successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ⚠️ Export the router
module.exports = router;
