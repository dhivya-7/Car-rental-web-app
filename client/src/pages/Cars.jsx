import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import carsData from "../data/carsData"; // Make sure this has the correct structure
import "./Cars.css";

export default function Cars() {
  const navigate = useNavigate();

  // Filters state
  const [filters, setFilters] = useState({
    type: "",
    fuel: "",
    transmission: "",
    minPrice: "",
    maxPrice: "",
  });

  //  Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  //  Filter cars
  const filteredCars = carsData.filter((car) => {
    return (
      (filters.type === "" || car.type === filters.type) &&
      (filters.fuel === "" || car.fuel === filters.fuel) &&
      (filters.transmission === "" || car.transmission === filters.transmission) &&
      (filters.minPrice === "" || car.pricePerDay >= parseInt(filters.minPrice)) &&
      (filters.maxPrice === "" || car.pricePerDay <= parseInt(filters.maxPrice))
    );
  });

  // Handle booking
  const handleBookNow = (car) => {
    navigate("/booking", { state: { car } });
  };

  return (
    <div className="cars-page">
      {/* Yellow Banner */}
      <div className="yellow-bar">Available Cars for Your Journey</div>

      <div className="cars-container">
        {/* Left Sidebar Filters */}
        <div className="cars-left">
          <h3>Filters</h3>

          <div className="filter-item">
            <label>Car Type</label>
            <select name="type" onChange={handleFilterChange} value={filters.type}>
              <option value="">All</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Fuel Type</label>
            <select name="fuel" onChange={handleFilterChange} value={filters.fuel}>
              <option value="">All</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Transmission</label>
            <select name="transmission" onChange={handleFilterChange} value={filters.transmission}>
              <option value="">All</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Min Price</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min ₹"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-item">
            <label>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max ₹"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Right Car Listing */}
        <div className="cars-right">
          <h3>Available Cars ({filteredCars.length})</h3>
          <div className="car-grid">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div key={car.id} className="car-card">
                  <img src={car.image} alt={car.name} />
                  <div className="car-card-content">
                    <h4>{car.name}</h4>
                    <p>
                      {car.type} • {car.fuel} • {car.transmission}
                    </p>
                    <p className="car-price">₹{car.pricePerDay} / day</p>
                    <button className="book-btn" onClick={() => handleBookNow(car)}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No cars match your filters 🚫</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
