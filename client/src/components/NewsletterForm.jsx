import React, { useState } from "react";
import axios from "axios";

export default function NewsletterForm() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterStatus("Please enter your email address.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/newsletter", { email: newsletterEmail });
      setNewsletterStatus(response.data.message);
      setNewsletterEmail("");
    } catch (error) {
      console.error("Newsletter subscribe error:", error);
      if (error.response) {
        setNewsletterStatus(`Error ${error.response.status}: ${error.response.data.message || "Server error"}`);
      } else if (error.request) {
        setNewsletterStatus("No response from server. Check backend or CORS.");
      } else {
        setNewsletterStatus(`Request error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container my-5 form-section newsletter-form">
      <h2>Subscribe to our Newsletter</h2>
      <p>Sign up and stay updated on our special offers and best deals.</p>
      <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row gap-2">
        <input type="email" className="form-control" placeholder="Please enter your email address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Subscribe</button>
      </form>
      <p className="mt-2" style={{ fontSize: "0.9rem", color: "#555" }}>
        By signing up you agree to EconomyBookings Privacy Policy
      </p>
      {newsletterStatus && <p className="mt-2">{newsletterStatus}</p>}
    </div>
  );
}
