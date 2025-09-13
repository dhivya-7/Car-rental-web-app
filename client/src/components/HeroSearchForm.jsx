import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./HeroSearch.css";

export default function HeroSearch() {
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupLatLng, setPickupLatLng] = useState(null);
  const [dropoffLatLng, setDropoffLatLng] = useState(null);
  const [activeSelection, setActiveSelection] = useState("pickup");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [driverAge, setDriverAge] = useState("");

  function LocationSelector() {
    useMapEvents({
      click(e) {
        if (activeSelection === "pickup") setPickupLatLng([e.latlng.lat, e.latlng.lng]);
        else setDropoffLatLng([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate) {
      alert("Please fill all required fields.");
      return;
    }

    navigate("/cars", {
      state: {
        city: pickupLocation,
        pickupLocation,
        dropoffLocation,
        pickupLatLng,
        dropoffLatLng,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        driverAge,
      },
    });
  };

  return (
    <div className="hero-search-container">
      <div className="hero-background">
        <h1>Find the Best Car Rental</h1>
      </div>

      <form className="yellow-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Drop-off Location"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
        />
        <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
        <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
        <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} />
        <input type="time" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} />
        <input
          type="number"
          placeholder="Driver Age"
          value={driverAge}
          onChange={(e) => setDriverAge(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="map-section">
        <div className="map-buttons">
          <button
            type="button"
            className={activeSelection === "pickup" ? "active" : ""}
            onClick={() => setActiveSelection("pickup")}
          >
            Set Pickup
          </button>
          <button
            type="button"
            className={activeSelection === "dropoff" ? "active" : ""}
            onClick={() => setActiveSelection("dropoff")}
          >
            Set Drop-off
          </button>
        </div>

        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "350px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationSelector />
          {pickupLatLng && <Marker position={pickupLatLng} />}
          {dropoffLatLng && <Marker position={dropoffLatLng} />}
        </MapContainer>
      </div>
    </div>
  );
}
