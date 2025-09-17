const Payment = require("../models/Payment");

function maskCard(card) {
  if (!card) return "**** **** **** ****";
  const digits = card.replace(/\s+/g, "");
  const last4 = digits.slice(-4);
  return "**** **** **** " + last4;
}

exports.savePayment = async (req, res) => {
  try {
    const { fullName, email, address, city, state, zip, cardNumber, expMonth, expYear, cvv, amount, bookingId } = req.body;

    const payment = new Payment({
      fullName: fullName || "Unknown",
      email: email || "Unknown",
      address,
      city,
      state,
      zip,
      amount: amount || 0,
      bookingId: bookingId || null,
      cardNumber: cardNumber ? maskCard(cardNumber) : "**** **** **** ****",
      expMonth: expMonth || "XX",
      expYear: expYear || "XX",
      cvv: "***",
    });

    const saved = await payment.save();
    res.status(201).json({ success: true, payment: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    if (req.body.cardNumber) {
      req.body.cardNumber = maskCard(req.body.cardNumber);
      if (req.body.cvv) req.body.cvv = "***";
    }
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Payment not found" });
    res.json({ success: true, payment: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const removed = await Payment.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: "Payment not found" });
    res.json({ success: true, message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
