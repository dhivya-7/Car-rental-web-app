import React, { useState } from "react";
import "./CarFilter.css";

export default function CarFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    type: "",
    fuel: "",
    minSeats: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters); // send filters to parent component
    }
  };

  return (
    <div className="car-filter-container">
      <h3>Filter Cars</h3>
      <form className="car-filter-form" onSubmit={handleSearch}>
        <div className="filter-item">
          <label>Type:</label>
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">All</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Fuel:</label>
          <select name="fuel" value={filters.fuel} onChange={handleChange}>
            <option value="">All</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Min Seats:</label>
          <input
            type="number"
            name="minSeats"
            placeholder="0"
            value={filters.minSeats}
            onChange={handleChange}
          />
        </div>

        <div className="filter-item">
          <label>Max Price:</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="0"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="search-btn">Search</button>
      </form>
    </div>
  );
}
