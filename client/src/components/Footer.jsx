import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h5>© 2025 My Car Rental Website. All rights reserved.</h5>
        <div className="social-icons">
          <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="www.linkedin.com/in/dhivya-dhivakar" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
