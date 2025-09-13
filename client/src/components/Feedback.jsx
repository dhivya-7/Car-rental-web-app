import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./feedback.css";


export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  const renderStars = (rating) => (
    <span className="stars">
      {"★".repeat(rating) + "☆".repeat(5 - rating)}
    </span>
  );

return (
  <div className="feedback-section">
    <h2 className="feedback-heading">What Our Customers Say</h2>

    {feedbacks.length === 0 ? (
      <p style={{ textAlign: "center", color: "#888" }}>
        No feedback available yet.
      </p>
    ) : (
      <Slider {...settings} className="feedback-carousel">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="feedback-card">
            <div className="feedback-rating">{renderStars(fb.rating)}</div>
            <h3 className="feedback-title">{fb.title}</h3>
            <p className="feedback-text">{fb.text}</p>
            <small className="feedback-author">- {fb.name}</small>
          </div>
        ))}
      </Slider>
    )}

    {/* Feedback form here */}
    <FeedbackForm onFeedbackAdded={(newFb) => setFeedbacks([newFb, ...feedbacks])} />
  </div>
);
}