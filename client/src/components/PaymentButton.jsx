// PaymentButton.jsx
import React, { useState } from "react";
import axios from "axios";

export default function PaymentButton({ amount }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/create-checkout-session", { amount });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Payment failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Redirecting..." : "Pay Now"}
    </button>
  );
}
