import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email?.value || "";
    const password = form.password?.value || "";

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/fooduser/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/createfood");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
            <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top:34,
          left: 29,
          zIndex: 30,
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          borderRadius: 9999,
          boxShadow: '0 2px 8px rgba(2,6,23,0.10)',
          padding: '8px 12px 8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontWeight: 600,
          color: '#1D4ED8',
          fontSize: 15,
          cursor: 'pointer'
        }}
        aria-label="Go back to home"
      >
        <svg width="18" height="18" fill="none" stroke="#1D4ED8" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: "36px 28px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        <header style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#1D4ED8" }}>
            Partner Sign In
          </h1>
          <p style={{ fontSize: "14px", color: "#4B5563", marginTop: "6px" }}>
            Sign in to manage your listings and orders.
          </p>
        </header>

        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="contact@foodco.com"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "12px",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "10px",
              backgroundColor: "#1D4ED8",
              color: "#fff",
              cursor: "pointer",
              border: "none",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1E40AF")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
          >
            Sign In
          </button>
        </form>

        <footer
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "14px",
            color: "#4B5563",
          }}
        >
          Need an account?{" "}
          <a
            href="/foodpartner/register"
            style={{
              color: "#1D4ED8",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            Create one
          </a>
        </footer>
      </div>
    </section>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #D1D5DB",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
};

export default FoodPartnerLogin;