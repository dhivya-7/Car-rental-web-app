import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePayment } from "../api";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "", email: "", address: "", city: "", state: "", zip: "",
    cardNumber: "", expMonth: "", expYear: "", cvv: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await savePayment(formData);
    if (res.success) {
      alert("✅ Payment Successful!");
      navigate("/success");
    } else {
      alert("❌ Payment Failed: " + res.message);
    }
  };

  const isFormValid = Object.values(formData).every(val => val.trim() !== "");

  return (
    <div className="payment-page">
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="billing">
          <h3>BILLING ADDRESS</h3>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <div className="row">
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Choose State</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka</option>
            </select>
            <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} />
          </div>
        </div>

        <div className="payment">
          <h3>PAYMENT</h3>
          <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} />
          <div className="row">
            <input type="text" name="expMonth" placeholder="Exp Month" value={formData.expMonth} onChange={handleChange} />
            <input type="text" name="expYear" placeholder="Exp Year" value={formData.expYear} onChange={handleChange} />
            <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} />
          </div>
          <button type="submit" disabled={!isFormValid}>Proceed to Checkout</button>
        </div>
      </form>
    </div>
  );
}
