import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    pickupDate: "",
    dropoffDate: "",
    driverAge: "",
    promoCode: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/cars", { state: formData }); // pass data to Cars page
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input name="pickup" placeholder="Pickup City" onChange={handleChange} />
      <input name="dropoff" placeholder="Dropoff City" onChange={handleChange} />
      <input type="datetime-local" name="pickupDate" onChange={handleChange} />
      <input type="datetime-local" name="dropoffDate" onChange={handleChange} />
      <input name="driverAge" placeholder="Driver Age" onChange={handleChange} />
      <input name="promoCode" placeholder="Promo Code" onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}
