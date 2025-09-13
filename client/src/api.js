
const API_BASE = import.meta.env.VITE_API_BASE || "https://car-rental-backend-j1oi.onrender.com/api";
// Login
export async function login(payload) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return { success: true, ...data };
  } catch (err) {
    return { success: false, message: err.message || "Network error" };
  }
}

// Register (Signup)
export async function register(payload) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // return backend message even on error
      return { success: false, message: data.message || `Register failed: ${res.status}` };
    }

    // success
    return { success: true, message: data.message || "User registered successfully" };
  } catch (err) {
    return { success: false, message: err.message || "Network error" };
  }
}

// Create booking
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

// Search bookings (available cars)
export async function searchBookings(payload) {
  try {
    const res = await fetch(`${API_BASE}/bookings/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return res.ok ? data : { cars: [], message: data.message };
  } catch (err) {
    console.error("searchBookings error:", err);
    return { cars: [], message: err.message };
  }
}
