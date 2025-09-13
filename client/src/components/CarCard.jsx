import React from "react";
import "./CarCard.css";

export default function CarCard({ car, onBook }) {
  return (
    <div className="car-card">
      <img src={car.img || "/img/default-car.jpg"} alt={car.name} />
      <h3>{car.name}</h3>
      <p>{car.desc}</p>
      <p className="price">₹{car.price} / day</p>
      <button onClick={() => onBook(car)}>Book Now</button>
    </div>
  );
}
