const express = require("express");
const { validatePromo, addPromo } = require("../controllers/promoController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/validate", validatePromo);
router.post("/", protect, addPromo);

module.exports=router;