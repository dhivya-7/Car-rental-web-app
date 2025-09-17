
const dotenv = require("dotenv");  
dotenv.config();                   
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Stripe = require("stripe");  // Add Stripe import here
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");    
const companyRoutes = require("./routes/companyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const feedbackRoutes = require("./routes/feedback");
const mapsRoutes = require("./routes/routes-maps");

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);   
app.use("/api/companies", companyRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/maps", mapsRoutes);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("📩 Amount received from frontend:", amount);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Car Rental Payment" },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    console.log("✅ Stripe session created:", session.url);
    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
);


