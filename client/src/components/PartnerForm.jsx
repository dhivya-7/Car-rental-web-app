import React, { useState } from "react";
import axios from "axios";

export default function PartnerForm() {
  const [partnerFormData, setPartnerFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [partnerStatus, setPartnerStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPartnerFormData({
      ...partnerFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message, agree } = partnerFormData;
    if (!name || !email || !message || !agree) {
      setPartnerStatus("Please fill all required fields and agree to terms.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/partners", partnerFormData);
      setPartnerStatus(response.data.message);
      setPartnerFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      console.error(error);
      setPartnerStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container my-5 form-section partner-form">
      <h2>Become a Partner</h2>
      <p>If you are interested in cooperation with us, please fill out the form below.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name *</label>
          <input type="text" className="form-control" name="name" value={partnerFormData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email *</label>
          <input type="email" className="form-control" name="email" value={partnerFormData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Company Name</label>
          <input type="text" className="form-control" name="company" value={partnerFormData.company} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="tel" className="form-control" name="phone" value={partnerFormData.phone} onChange={handleChange} placeholder="+91" />
        </div>
        <div className="mb-3">
          <label>Message *</label>
          <textarea className="form-control" name="message" value={partnerFormData.message} onChange={handleChange} required />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" name="agree" checked={partnerFormData.agree} onChange={handleChange} />
          <label className="form-check-label">I agree with Terms & Conditions and Privacy Policy *</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {partnerStatus && <p className="mt-3">{partnerStatus}</p>}
      </form>
    </div>
  );
}
