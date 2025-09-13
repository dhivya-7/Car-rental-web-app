const express = require("express");
const { addPartner } = require("../controllers/partnerController");

const router = express.Router();

router.post("/", addPartner);

module.exports = router;
