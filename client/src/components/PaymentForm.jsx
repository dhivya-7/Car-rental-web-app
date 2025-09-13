
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function PaymentForm() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

  try {
  const res = await axios.post("http://localhost:5000/create-checkout-session", {
    amount: 2198,
  });

  console.log("Stripe session response:", res.data); 

  if (res.data.url) {
    window.location.href = res.data.url;
  } else {
    throw new Error("Stripe did not return a URL");
  }
} catch (err) {
  console.error("Payment error:", err.message);
  toast.error("Payment Failed! Redirecting...", { autoClose: 2000 });
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
  setLoading(false);
}
  };

  return (
    <div className="payment-form">
      <h3>Pay with Card</h3>

      <div className="card-logos">
        <img src="/img/visa.png" alt="Visa" />
        <img src="/img/mastercard.png" alt="Mastercard" />
        <img src="/img/amex.png" alt="Amex" />
      </div>

      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Redirecting..." : "Pay Now"}
      </button>

      <ToastContainer />
    </div>
  );
}
