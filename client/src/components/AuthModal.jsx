import React, { useState } from "react";
import { login, register } from "../api";

export default function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState("signup"); 
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let res;

      if (mode === "login") {
        res = await login({ email: form.email, password: form.password });

        if (res.success) {
          localStorage.setItem("token", res.token);
          setMessage(`✅ Welcome back, ${res.user?.name || "User"}!`);
          setTimeout(() => onClose(), 1000); // auto close modal
        } else {
          setMessage(`❌ Login failed: ${res.message}`);
        }
      } else {
        res = await register(form);

        if (res.success) {
          setMessage(`✅ ${res.message}`); // now message always defined
          setMode("login"); // switch to login after signup
          setForm({ name: "", email: "", password: "" });
        } else {
          setMessage(`❌ Signup failed: ${res.message}`);
        }
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message || "Network error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">{mode === "login" ? "Sign In" : "Create Account"}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="btn-group w-100 mb-3">
          <button
            type="button"
            className={`btn ${mode === "login" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`btn ${mode === "signup" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="d-grid gap-2">
          {mode === "signup" && (
            <input
              className="form-control"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>

          {message && <div className="alert alert-info py-2 m-0">{message}</div>}
        </form>
      </div>
    </div>
  );
}
