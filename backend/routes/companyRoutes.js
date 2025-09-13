const express = require("express");
const bcrypt = require("bcryptjs");
const Company = require("../models/Company");

const router = express.Router();

// POST /api/companies/register
router.post("/register", async (req, res) => {
  try {
    const { companyName, contactName, email, phone, password, confirmPassword } = req.body;

    if (!companyName || !contactName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await Company.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const company = new Company({
      companyName,
      contactName,
      email,
      phone,
      password: hashedPassword
    });

    await company.save();
    res.status(201).json({ message: "Company registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
