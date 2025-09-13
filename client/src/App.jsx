// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import TopNavbar from "./components/TopNavbar";
import SecondNavbar from "./components/SecondNavbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal"; 


// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Suppliers from "./pages/Suppliers";
import BookingSearch from "./pages/BookingSearch";
import ListYourCars from "./pages/ListYourCars";
import CarsFilter from "./pages/CarsFilter";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import BookingPaymentPage from "./pages/BookingPaymentPage";

// Stripe Checkout Component
import PaymentForm from "./components/PaymentForm";

// Success / Cancel Pages
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

export default function App() {
  return (
    <div className="app-root">
      <TopNavbar />
      <SecondNavbar />

      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/search" element={<BookingSearch />} />
        <Route path="/list-your-cars" element={<ListYourCars />} />
        <Route path="/filter" element={<CarsFilter />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-payment" element={<BookingPaymentPage />} />
        

        {/* Payment routes */}
        <Route path="/payment" element={<PaymentPage />} /> 
        <Route path="/checkout" element={<PaymentForm amount={2500} />} /> 

        {/* Payment result pages */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* ✅ Auth route */}
        <Route path="/auth" element={<AuthModal open={true} onClose={() => window.history.back()} />} />
      </Routes>

      <Footer />
    </div>
  );
}
