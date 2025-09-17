const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Save payment
router.post("/save", async (req, res) => {
  try {
    const { fullName, email, address, city, state, zip, cardNumber, expMonth, expYear, cvv } = req.body;

    const payment = new Payment({
      fullName,
      email,
      address,
      city,
      state,
      zip,
      cardNumber,
      expMonth,
      expYear,
      cvv,
    });

    await payment.save();
    res.json({ success: true, message: "Payment saved successfully!", data: payment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

