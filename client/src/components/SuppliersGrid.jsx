import React, { useState } from "react";

export default function SuppliersGrid() {
  const [showMore, setShowMore] = useState(false);

  const suppliers = [
    { name: "Toyota", logo: "bnd1.jpeg", rating: 4 },
    { name: "Hyundai", logo: "bnd2.jpeg", rating: 5 },
    { name: "Honda", logo: "bnd3.jpeg", rating: 4 },
    { name: "Suzuki", logo: "bnd4.jpeg", rating: 4 },
    { name: "Kia", logo: "bnd5.jpeg", rating: 5 },
    { name: "Mahindra", logo: "bnd6.jpeg", rating: 4 },
    { name: "Tata", logo: "bnd7.jpeg", rating: 4 },
    { name: "Maruti Suzuki", logo: "bnd8.jpeg", rating: 5 },
    { name: "BMW", logo: "bnd9.jpeg", rating: 5 },
    { name: "Mercedes-Benz", logo: "bnd10.jpeg", rating: 5 },
    { name: "Audi", logo: "bnd11.jpeg", rating: 4 },
    { name: "Jaguar", logo: "bnd12.jpeg", rating: 4 },
    { name: "Ford", logo: "bnd13.jpeg", rating: 4 },
    { name: "Nissan", logo: "bnd14.jpeg", rating: 4 },
    { name: "Volkswagen", logo: "bnd15.jpeg", rating: 4 },
    { name: "Skoda", logo: "bnd16.jpeg", rating: 4 },
    { name: "Renault", logo: "bnd17.jpeg", rating: 3 },
    { name: "Jeep", logo: "bnd18.jpeg", rating: 4 },
    { name: "Lexus", logo: "bnd19.jpeg", rating: 5 },
    { name: "Tesla", logo: "bnd20.jpeg", rating: 5 },
  ];

  return (
    <div className="container my-5">
      <h2>Best Rated Suppliers of 2025</h2>
      <p>In Mobility Partner of Choice Nomination</p>
      <p>
        Global car rental booking platform EconomyBookings has announced the
        winners of its 2025 Best Rated Supplier Award, recognizing suppliers
        that excelled in service and customer satisfaction.
      </p>

      {showMore && (
        <div className="suppliers-more">
          <p>Operating in over 150 countries with a network of 850+ suppliers...</p>
          <ul>
            <li>EzuRentals</li><li>SOLO</li><li>Alamo</li><li>Click rent</li>
            <li>Dollar</li><li>Thrifty</li><li>Hertz</li><li>Routes Car Rentals</li>
            <li>SIXT</li><li>Bargain</li><li>Sicily by Car</li><li>Locauto</li>
            <li>Enterprise</li><li>Guerin</li><li>Drive on Holidays</li>
            <li>Royal Rentals</li><li>SKG Rent a Car</li>
          </ul>
        </div>
      )}

      <button
        className="btn btn-warning mt-2"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show less" : "Read more"}
      </button>

      <div className="row g-4 mt-4">
        {suppliers.map((supplier, index) => (
          <div className="col-6 col-md-3 col-lg-2" key={index}>
            <div className="card shadow-sm text-center p-3 h-100">
              <img
                src={`/img/${supplier.logo}`}
                className="card-img-top img-fluid mb-2"
                alt={supplier.name}
              />
              <div className="card-body p-2">
                <h6 className="card-title">{supplier.name}</h6>
                <p className="text-warning mb-1">
                  {"⭐".repeat(Math.floor(supplier.rating))}
                </p>
                <button className="btn btn-sm btn-primary">View Cars</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
