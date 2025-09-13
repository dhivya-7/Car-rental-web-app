import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Feedback from "../components/Feedback";  // Import React Feedback component
import WhyUs from "../components/WhyUs";


/* Fix Leaflet marker icon paths for Vite (important) */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

/* small component to recenter the map when position changes */
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
}

export default function Home() {
  // default start near Namakkal, Tamil Nadu
  const NAMAKKAL = [11.2213, 78.1652];

  // inputs and suggestions
  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  // selected coords (arrays [lat, lng])
  const [pickupCoords, setPickupCoords] = useState(NAMAKKAL);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  // other form fields
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [driverAge, setDriverAge] = useState(30);
  const [promoCode, setPromoCode] = useState("");

  // refs for debounce timers
  const pickupTimer = useRef(null);
  const dropoffTimer = useRef(null);
  const navigate = useNavigate();

  // helper: fetch suggestions from Nominatim (OpenStreetMap)
  async function fetchNominatim(query, setter) {
    if (!query || query.length < 2) {
      setter([]);
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(
        query
      )}&countrycodes=in`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Accept-Language": "en" },
      });
      const data = await res.json();
      setter(data || []);
    } catch (err) {
      console.error("Nominatim error", err);
      setter([]);
    }
  }

  // debounce fetch for pickup
  function onPickupChange(val) {
    setPickupInput(val);
    if (pickupTimer.current) clearTimeout(pickupTimer.current);
    pickupTimer.current = setTimeout(() => fetchNominatim(val, setPickupSuggestions), 350);
  }

  // debounce fetch for dropoff
  function onDropoffChange(val) {
    setDropoffInput(val);
    if (dropoffTimer.current) clearTimeout(dropoffTimer.current);
    dropoffTimer.current = setTimeout(() => fetchNominatim(val, setDropoffSuggestions), 350);
  }

  // when user picks a suggestion
  function selectPickup(place) {
    setPickupInput(place.display_name);
    setPickupSuggestions([]);
    setPickupCoords([parseFloat(place.lat), parseFloat(place.lon)]);
  }

  function selectDropoff(place) {
    setDropoffInput(place.display_name);
    setDropoffSuggestions([]);
    setDropoffCoords([parseFloat(place.lat), parseFloat(place.lon)]);
  }

  // set coords by clicking on map
  const [activeSelection, setActiveSelection] = useState("pickup");

  // handler for search button
  function handleSearch() {
    if (!pickupCoords || !dropoffCoords || !pickupDate || !dropoffDate) {
      alert("Please select pickup & drop-off locations and dates.");
      return;
    }

    const state = {
      pickupLocation: pickupInput,
      dropoffLocation: dropoffInput,
      pickupLatLng: pickupCoords,
      dropoffLatLng: dropoffCoords,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      driverAge,
      promoCode,
    };

    navigate("/cars", { state });
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Find the Best Car Rental for Daily & Weekly</h1>
          <p>All Over Tamilnadu..</p>
        </div>

        

        <div className="search-bar">
          <div className="search-field">
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickupInput}
              onChange={(e) => onPickupChange(e.target.value)}
            />
            {pickupSuggestions.length > 0 && (
              <ul className="suggestions">
                {pickupSuggestions.map((p) => (
                  <li key={p.place_id} onClick={() => selectPickup(p)}>
                    {p.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="search-field">
            <input
              type="text"
              placeholder="Drop-off Location"
              value={dropoffInput}
              onChange={(e) => onDropoffChange(e.target.value)}
            />
            {dropoffSuggestions.length > 0 && (
              <ul className="suggestions">
                {dropoffSuggestions.map((p) => (
                  <li key={p.place_id} onClick={() => selectDropoff(p)}>
                    {p.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
          <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} />
          <input type="time" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} />
          <input type="number" min="21" max="100" value={driverAge} onChange={(e) => setDriverAge(e.target.value)} />
          <input type="text" placeholder="Promo Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>

        <div className="map-controls">
          <span>Click map to set: </span>
          <button
            className={activeSelection === "pickup" ? "active" : ""}
            onClick={() => setActiveSelection("pickup")}
          >
            Pickup
          </button>
          <button
            className={activeSelection === "dropoff" ? "active" : ""}
            onClick={() => setActiveSelection("dropoff")}
          >
            Drop-off
          </button>
        </div>

        {/* MAP */}
        <div className="hero-map">
          <MapContainer center={pickupCoords || NAMAKKAL} zoom={8} style={{ height: "420px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

            <MapClickHandler
              onClick={(latlng) => {
                if (activeSelection === "pickup") {
                  setPickupCoords(latlng);
                  setPickupInput(`${latlng[0].toFixed(6)}, ${latlng[1].toFixed(6)}`);
                  setPickupSuggestions([]);
                } else {
                  setDropoffCoords(latlng);
                  setDropoffInput(`${latlng[0].toFixed(6)}, ${latlng[1].toFixed(6)}`);
                  setDropoffSuggestions([]);
                }
              }}
            />

            {/* Recenter map when pickup changes */}
            <Recenter position={pickupCoords || NAMAKKAL} />

            {pickupCoords && (
              <Marker position={pickupCoords}>
                <Popup>Pickup: {pickupInput}</Popup>
              </Marker>
            )}
            {dropoffCoords && (
              <Marker position={dropoffCoords}>
                <Popup>Drop-off: {dropoffInput}</Popup>
              </Marker>
            )}

            {pickupCoords && dropoffCoords && (
              <Polyline positions={[pickupCoords, dropoffCoords]} />
            )}
          </MapContainer>
        </div>
      </div>
      
      {/* Why Us section */}
 <WhyUs />   

{/* ✅ Feedback only on Home page */}
        <Feedback />

    </div>
  );
}

/* small component that exposes map click via props */
function MapClickHandler({ onClick }) {
  const map = useMap();
  useEffect(() => {
    function handler(e) {
      const latlng = [e.latlng.lat, e.latlng.lng];
      if (onClick) onClick(latlng);
    }
    map.on("click", handler);
    return () => map.off("click", handler);
  }, [map, onClick]);
  return null;
}
