const mongoose = require("mongoose");
const Supplier = require("./models/Supplier"); // adjust path if needed

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/car_rental", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Supplier data
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

async function seed() {
  try {
    await Supplier.deleteMany(); // clear old data
    await Supplier.insertMany(suppliers);
    console.log("✅ Suppliers seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding suppliers:", err);
  }
}

seed();
