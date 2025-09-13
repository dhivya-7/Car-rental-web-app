import React, { useState } from "react";
import axios from "axios";
import "./feedback.css";

export default function FeedbackForm({ onFeedbackAdded }) {
  const [formData, setFormData] = useState({
    rating: "",
    title: "",
    name: "",
    text: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/feedback", formData);
      setMessage("Feedback submitted!");
      setFormData({ rating: "", title: "", name: "", text: "" });
      if (onFeedbackAdded) onFeedbackAdded(res.data.feedback);
    } catch (err) {
      setMessage(" Failed to submit feedback");
    }
  };
  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h3>Leave Your Feedback</h3>

      <input
        type="number"
        name="rating"
        min="1"
        max="5"
        value={formData.rating}
  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
  placeholder="Rating (1-5)"
  required />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />

      <textarea
        name="text"
        value={formData.text}
        onChange={handleChange}
        placeholder="Write your feedback..."
        required
      />

      <button type="submit">Submit</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}
