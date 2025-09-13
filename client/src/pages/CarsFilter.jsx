import React from "react";
import { useLocation } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import PaymentForm from "../components/PaymentForm";
import CarCard from "../components/CarCard";
import "./Cars.css";

export default function CarsFilter() {
  const location = useLocation();
  const searchData = location.state?.search || {};

  const cars = [
    { id: 1, name: "Toyota Corolla", price: 2500, seats: 5, fuel: "Petrol", img: "/img/img01.jpeg" },
    { id: 2, name: "Honda Civic", price: 2000, seats: 5, fuel: "Diesel", img: "/img/img02.jpeg" },
    { id: 3, name: "Hyundai Creta", price: 3000, seats: 5, fuel: "Petrol", img: "/img/img03.jpeg" },
  ];

  return (
    <div className="cars-page">
      {/* Show search summary */}
      <div className="search-summary">
        <h3>Your Search</h3>
        <p>Pickup: {searchData.pickup}</p>
        <p>Dropoff: {searchData.dropoff}</p>
        <p>Dates: {searchData.pickupDate} → {searchData.dropoffDate}</p>
        <p>Driver Age: {searchData.driverAge}</p>
      </div>

      <div className="cars-container">
        {/* Left side filters */}
        <div className="filters">
          <h3>Filters</h3>
          <label>Price: <input type="range" min="1000" max="5000" /></label>
          <label>Type: <select><option>SUV</option><option>Sedan</option></select></label>
          <label>Fuel: <select><option>Petrol</option><option>Diesel</option></select></label>
        </div>

        {/* Right side cars + booking + payment */}
        <div className="cars-and-booking">
          <h3>Available Cars</h3>
          <div className="car-list">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <h3>Booking Form</h3>
          <BookingForm />

          <h3>Payment Method</h3>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}
