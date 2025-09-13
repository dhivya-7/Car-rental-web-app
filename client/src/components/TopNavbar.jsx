import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import AuthModal from "./AuthModal";
import { Link } from "react-router-dom";

import "./TopNavbar.css";

export default function TopNavbar() {
  const { dark, toggle } = useTheme();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav id="topNavbar" className="px-3 navbar">
        <Link className="brand d-flex align-items-center" to="/">
          <img src="/img/logo.png" alt="logo" className="logo me-2" />
          <span>Car Rental</span>
        </Link>

        <div className="d-flex align-items-center gap-2">
          <div className="btn-group" role="group" aria-label="pills">
            <Link className="btn btn-primary" to="/list-your-cars">
              List your Cars
            </Link>
            <button className="btn btn-primary" onClick={() => setShowAuth(true)}>
              Sign In
            </button>
          </div>

          <div className="form-check form-switch ms-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={dark}
              onChange={toggle}
            />
          </div>
        </div>
      </nav>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
