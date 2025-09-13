import React, { useState } from "react";
import "./ListYourCars.css";
import Footer from "../components/Footer";

export default function ListCars() {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      setMessage("You must agree to the terms.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage(" Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/companies/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName: formData.company,
            contactName: formData.contact,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Server returned non-JSON response" };
      }

      if (res.ok) {
        setMessage("Thank you! Company registered successfully.");
        setFormData({
          company: "",
          contact: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
      } else {
        setMessage("❌ " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listcars-page">
      {/* Hero Section */}
      <section className="hero-listcars">
        <h1>Join our car rental marketplace</h1>
        <p>Get started – it’s free!</p>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="benefit-card">
          <h2>2M</h2>
          <h3>Broad exposure</h3>
          <p>
            Access a wide audience of customers actively seeking rental cars,
            boosting your visibility and reach.
          </p>
        </div>
        <div className="benefit-card">
          <h2>1.6K</h2>
          <h3>Easy management</h3>
          <p>
            List your vehicles and handle bookings effortlessly on our
            user-friendly platform.
          </p>
        </div>
        <div className="benefit-card">
          <h2>500K</h2>
          <h3>Consistent earnings</h3>
          <p>
            Receive reliable and prompt payments after services, supporting
            steady business growth.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <h2>HOW IT WORKS</h2>
        <h3>Build your business with us</h3>
        <div className="steps">
          <div className="step">
            <h1>1</h1>
            <h4>Sign up</h4>
            <p>Complete the simple online form to apply as a partner.</p>
          </div>
          <div className="step">
            <h1>2</h1>
            <h4>Upload your car</h4>
            <p>
              Start receiving bookings from customers worldwide and service them
              through our integrated platform.
            </p>
          </div>
          <div className="step">
            <h1>3</h1>
            <h4>Receive bookings & Get paid</h4>
            <p>
              After completing the services, receive prompt and secure payments.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section className="partner-form">
        <h2>Join EconomyBookings Marketplace</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company name *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact person's name *</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label>
              By checking this box you agree with our Terms & Conditions and
              Privacy Policy *
            </label>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Submitting..." : "Okay, let's go!"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </section>

    
    </div>
  );
}
