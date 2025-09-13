const Partner = require("../models/Partner");

exports.addPartner = async (req, res) => {
  try {
    const { name, email, company, phone, message, agree } = req.body;

    if (!name || !email || !message || !agree) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const partner = new Partner({ name, email, company, phone, message, agree });
    await partner.save();

    res.status(201).json({ message: "Partner request submitted successfully!" });
  } catch (error) {
    console.error("Add Partner error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
