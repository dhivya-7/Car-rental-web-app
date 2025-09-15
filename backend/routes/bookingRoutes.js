const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.post("/search", bookingController.searchBookings);

module.exports = router;