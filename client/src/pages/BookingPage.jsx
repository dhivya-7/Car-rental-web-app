import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPage.css";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    passengers: "",
    days: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Go to payment page after form
    navigate("/payment", { state: { car, formData } });
  };

  if (!car) {
    return <p>No car selected. Please go back to Cars page.</p>;
  }

  return (
    <div className="booking-page">
      {/* Left - Car Details */}
      <div className="booking-left">
        <img src={car.image} alt={car.name} className="car-image" />
        <h2>{car.name}</h2>
        <p>Seats: {car.seats}</p>
        <p>Fuel: {car.fuel}</p>
        <p className="price">₹{car.pricePerDay} / day</p>
      </div>

      {/* Right - Booking Form */}
      <div className="booking-right">
        <h2>Online Booking</h2>
        <p>
          Please fill out the information below to complete your online
          reservation.
        </p>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="passengers"
            placeholder="Number of Passengers"
            value={formData.passengers}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="days"
            placeholder="How many days do you need?"
            value={formData.days}
            onChange={handleChange}
            required
          />

          <button type="submit" className="book-btn">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}
