const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// ----------------- AUTH -----------------

// Login
export async function login(payload) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Login failed" };

    if (data.token) localStorage.setItem("token", data.token);
    return { success: true, ...data };
  } catch (err) {
    return { success: false, message: err.message || "Network error" };
  }
}

// Register
export async function register(payload) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Register failed" };

    return { success: true, message: data.message || "User registered successfully" };
  } catch (err) {
    return { success: false, message: err.message || "Network error" };
  }
}



// ----------------- BOOKINGS -----------------
export async function createBooking(payload) {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return res.ok ? { success: true, booking: data } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// ----------------- PAYMENTS -----------------
export async function savePayment(payload) {
  try {
    const res = await fetch(`${API_BASE}/payment/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return res.ok ? { success: true, data: data.data } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: err.message };
  }
}



