import React from "react";
import "./CareSection.css";

export default function CareSection() {
  return (
    <section className="care-section">
      {/* Title + Subtitle */}
      <div className="care-header">
        <h2>We care for you</h2>
        <p>Our main principle is to support you before, during and after the rental.</p>
      </div>

      {/* Two-column layout */}
      <div className="care-content">
        {/* Left Image */}
        <div className="care-image">
          <img src="/img/driver.png" alt="Driver" />
        </div>

        {/* Right Text Blocks */}
        <div className="care-info">
          <div className="care-item">
            <img src="/img/multiLanguage.svg" alt="Language Support" className="care-icon" />
            <div>
              <h3>Multi-language support</h3>
              <p>We are ready to assist you with any questions in different languages.</p>
            </div>
          </div>

          <div className="care-item">
            <img src="/img/world.svg" alt="Locations" className="care-icon" />
            <div>
              <h3>Over 20,000 locations</h3>
              <p>We compare car rental offers in 20,000 airport and city locations in 180+ countries.</p>
            </div>
          </div>

          <div className="care-item">
            <img src="/img/team.svg" alt="Team" className="care-icon" />
            <div>
              <h3>Team of professionals</h3>
              <p>We are passionate about providing excellent service and exceeding customer expectations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
