import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// ✅ Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your publishable key (from Stripe dashboard)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        {/* Wrap entire app with Stripe Elements */}
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);


