// CarBookingPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookingForm from "./BookingForm";
import "./CarBookingPage.css";

export default function CarBookingPage() {
  const { state } = useLocation();
  const { carId } = useParams(); // route: /car-booking/:carId
  const navigate = useNavigate();

  const [selectedCar, setSelectedCar] = useState(state?.selectedCar || null);

  useEffect(() => {
    let cancelled = false;

    // If we already have the car via router state, do nothing
    if (selectedCar) return;

    // If we have an id, fetch silently
    if (carId) {
      (async () => {
        try {
          const res = await axios.get(`/api/cars/${carId}`);
          if (!cancelled) setSelectedCar(res.data);
        } catch {
          if (!cancelled) navigate("/cars", { replace: true }); // silent redirect
        }
      })();
    } else {
      // No state and no id → go back silently
      navigate("/cars", { replace: true });
    }

    return () => { cancelled = true; };
  }, [carId, selectedCar, navigate]);

  // No extra UI while loading or redirecting
  if (!selectedCar) return null;

  return (
    <div className="car-booking-page">
      <div className="car-details">
        <img src={selectedCar.image} alt={selectedCar.model} className="car-image" />
        <h2>{selectedCar.model}</h2>
        {selectedCar.description && <p>{selectedCar.description}</p>}
        {selectedCar.price && <p><strong>Price per day:</strong> ₹{selectedCar.price}</p>}
        {selectedCar.seats && <p><strong>Seats:</strong> {selectedCar.seats}</p>}
        {selectedCar.fuelType && <p><strong>Fuel:</strong> {selectedCar.fuelType}</p>}
      </div>
      <div className="booking-form-container">
        <BookingForm selectedCar={selectedCar} />
      </div>
    </div>
  );
}
