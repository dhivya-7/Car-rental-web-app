import React, { useState } from "react";

export default function Filters({ onFilter }) {
  const [type, setType] = useState("");
  const [fuel, setFuel] = useState("");
  const [price, setPrice] = useState("");

  const handleFilterChange = () => {
    onFilter({ type, fuel, price });
  };

  return (
    <div className="car-filters">
      <h3>Filters</h3>

      <div className="filter-item">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="MPV">MPV</option>
        </select>
      </div>

      <div className="filter-item">
        <label>Fuel</label>
        <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">All</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      <div className="filter-item">
        <label>Max Price</label>
        <input
          type="number"
          placeholder="Enter max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}
