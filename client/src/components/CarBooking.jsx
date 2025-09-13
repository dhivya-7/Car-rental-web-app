import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

export default function CarBooking({ selectedCar, pickupLocation, dropoffLocation }) {
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    dropoffDate: "",
    dropoffTime: "",
    driverAge: "",
    promoCode: "",
    rentalPeriod: "",
    totalPrice: selectedCar?.price || 0,
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        carId: selectedCar._id,
        carName: selectedCar.name,
        pickupLocation,
        dropoffLocation,
        ...formData,
        driverAge: Number(formData.driverAge),
        totalPrice: Number(formData.totalPrice),
      });
      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      alert("Failed to book car.");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book {selectedCar.name}</h2>

      {/* Map */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "300px", width: "100%", marginBottom: "20px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pickupLocation && (
          <Marker position={[pickupLocation.lat, pickupLocation.lng]}>
            <Popup>Pickup: {pickupLocation.name}</Popup>
          </Marker>
        )}
        {dropoffLocation && (
          <Marker position={[dropoffLocation.lat, dropoffLocation.lng]}>
            <Popup>Dropoff: {dropoffLocation.name}</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Booking Form */}
      <form onSubmit={handleBooking}>
        <input type="date" name="pickupDate" onChange={handleChange} required />
        <input type="time" name="pickupTime" onChange={handleChange} required />
        <input type="date" name="dropoffDate" onChange={handleChange} required />
        <input type="time" name="dropoffTime" onChange={handleChange} required />
        <input type="number" name="driverAge" placeholder="Driver Age" onChange={handleChange} required />
        <input type="text" name="promoCode" placeholder="Promo Code" onChange={handleChange} />
        <input type="text" name="rentalPeriod" placeholder="Rental Period" onChange={handleChange} required />
        <input type="number" name="totalPrice" placeholder="Total Price" value={formData.totalPrice} onChange={handleChange} required />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}
