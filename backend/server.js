const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const Stripe = require("stripe");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const companyRoutes = require("./routes/companyRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const feedbackRoutes = require("./routes/feedback");
const mapsRoutes = require("./routes/routes-maps");
const paymentRoutes = require("./routes/paymentRoutes");

// Connect MongoDB
connectDB();

const app = express();


app.use(cors({
  origin: ["https://dhivya-car-booking.netlify.app", "http://localhost:5173"],
  credentials: true,
}));


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Stripe setup
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Missing STRIPE_SECRET_KEY in .env");
  process.exit(1);
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/payment", paymentRoutes);

// Stripe Checkout Session
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Car Rental Payment" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",

success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
