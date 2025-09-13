const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

router.post("/", bookingController.createBooking);
router.post("/search", bookingController.searchBookings);

module.exports = router;
