const Promo = require("../models/Promo");

// Validate promo code
exports.validatePromo = async (req, res) => {
  try {
    const { code } = req.body;
    const promo = await Promo.findOne({ code });
    if (!promo) return res.status(404).json({ message: "Invalid code" });

    if (new Date() > promo.expiry) return res.status(400).json({ message: "Promo expired" });

    res.json({ discount: promo.discount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add promo code (Admin only)
exports.addPromo = async (req, res) => {
  try {
    const promo = await Promo.create(req.body);
    res.status(201).json(promo);
  } catch (err) {
    res.status(400).json({ message: err.message});
}
};