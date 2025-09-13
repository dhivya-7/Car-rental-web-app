import React, { useEffect } from "react";
import axios from "axios";

export default function Success() {
  useEffect(() => {
    const savePayment = async () => {
      try {
        await axios.post("http://localhost:5000/api/payment/save", {
          fullName: "Test User",
          email: "test@example.com",
          address: "123 Street",
          city: "City",
          state: "State",
          zip: "12345",
          amount: 2198,
        });
        console.log("Payment saved to DB!");
      } catch (err) {
        console.error("Error saving payment:", err);
      }
    };

    savePayment();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your booking.</p>
    </div>
  );
}
