import React from "react";
import SuppliersGrid from "../components/SuppliersGrid";
import PartnerForm from "../components/PartnerForm";
import NewsletterForm from "../components/NewsletterForm";
import "./Suppliers.css";

export default function Suppliers() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-suppliers text-white text-center d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-5 fw-bold hero-title">Our Trusted Suppliers</h1>
        <p className="lead hero-subtitle">
          Choose from 20+ global and local car rental partners
        </p>
      </div>

      {/* Suppliers grid */}
      <SuppliersGrid />

      {/* Partner form */}
      <PartnerForm />

      {/* Newsletter subscription */}
      <NewsletterForm />
    </div>
  );
}
