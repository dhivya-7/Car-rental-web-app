import { useState } from "react";

export default function FilterForm({ onFilter }) {
  const [filters, setFilters] = useState({
    type: "All",
    fuel: "All",
    minSeats: 0,
    maxPrice: 10000,
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filter Cars</h3>
      <label>Type: </label>
      <select name="type" value={filters.type} onChange={handleChange}>
        <option>All</option>
        <option>Compact</option>
        <option>SUV</option>
      </select>

      <label> Fuel: </label>
      <select name="fuel" value={filters.fuel} onChange={handleChange}>
        <option>All</option>
        <option>Petrol</option>
        <option>Diesel</option>
      </select>

      <label> Min Seats: </label>
      <input
        type="number"
        name="minSeats"
        value={filters.minSeats}
        onChange={handleChange}
      />

      <label> Max Price: </label>
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
      />

      <button onClick={() => onFilter(filters)}>Search</button>
    </div>
  );
}
