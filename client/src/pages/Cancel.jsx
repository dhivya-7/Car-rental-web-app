
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment Failed! Redirecting...", { autoClose: 2000 });
    const timer = setTimeout(() => navigate("/"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1> Payment Canceled</h1>
      <p>Your payment was not completed.</p>
      <ToastContainer />
    </div>
  );
}
