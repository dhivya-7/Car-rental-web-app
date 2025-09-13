import React from "react";
import "./WhyUs.css";

const WhyUs = () => {
  const cards = [
    {
      title: "Diversity",
      desc: "We guarantee that you will find the best car for your trip thanks to special offers from 600+ suppliers.",
      icon: "/img/diversity.svg",
    },
    {
      title: "Value for Money",
      desc: "We are happy to offer our customers the best prices due to having access to discounts provided by rental companies.",
      icon: "/img/discountBadge.svg",
    },
    {
      title: "Experience & Expertise",
      desc: "With over a decade on the market, we are one of the most experienced and trusted experts in the car rental field.",
      icon: "/img/cup.svg",
    },
  ];

  return (
    <section className="why-us-section">
      <div className="container">
        <h2 className="section-title">Why Us</h2>
        <div className="why-us-cards">
          {cards.map((card, index) => (
            <div className="why-us-card" key={index}>
              <img src={card.icon} alt={card.title} className="why-us-icon" />
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
