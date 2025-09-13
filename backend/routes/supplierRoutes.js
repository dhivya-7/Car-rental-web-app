const express = require("express");
const { getSuppliers, addSupplier } = require("../controllers/supplierController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET all suppliers
router.get("/", getSuppliers);

// Add new supplier (only logged-in users)
router.post("/", protect, addSupplier);

module.exports = router;
