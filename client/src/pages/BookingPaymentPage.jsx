import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const handlePaymentSuccess = () => {
    navigate("/success");
  };

  return (
    <div className="payment-page">
      <h2>Payment for {car?.name}</h2>
      <p>Amount: ₹{car?.price}</p>
      <button className="btn btn-primary" onClick={handlePaymentSuccess}>Pay Now</button>
    </div>
  );
}
