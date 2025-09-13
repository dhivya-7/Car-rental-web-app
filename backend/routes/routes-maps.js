
const express = require("express");
const axios = require("axios");
const router = express.Router();

// GET /api/maps/search?query=Namakkal
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(url);

    if (!response.data.results.length) {
      return res.status(404).json({ message: "Address not found" });
    }

    const result = response.data.results[0];
    res.json({
      address: result.formatted_address,
      location: result.geometry.location, // { lat, lng }
    });
  } catch (error) {
    console.error("Maps API error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
