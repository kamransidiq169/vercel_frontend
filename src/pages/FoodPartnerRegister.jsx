import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const businessName = form.businessName?.value || "";
    const contactName = form.contactName?.value || "";
    const phone = form.phone?.value || "";
    const address = form.address?.value || "";
    const email = form.email?.value || "";
    const password = form.password?.value || "";

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/fooduser/register",
        { businessName, contactName, phone, address, email, password },
        { withCredentials: true }
      );
  console.log(response.data);
  navigate("/foodpartner/login");
    } catch (error) {
      console.error("Registration failed:", error);
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
          maxWidth: "460px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: "36px 28px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        <header style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#1D4ED8" }}>
            Partner Sign Up
          </h1>
          <p style={{ fontSize: "14px", color: "#4B5563", marginTop: "6px" }}>
            Create a food partner account to list your services.
          </p>
        </header>

        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <div>
            <label htmlFor="businessName" style={labelStyle}>
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              placeholder="My Food Co."
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="contactName" style={labelStyle}>
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              placeholder="Contact person"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="phone" style={labelStyle}>
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+91 9876543210"
              required
              style={inputStyle}
            />
          </div>

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
              placeholder="Create a password"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="address" style={labelStyle}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="123 Food St, City, Country"
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
            Create Partner Account
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
          Already a partner?{" "}
          <a
            href="/foodpartner/login"
            style={{
              color: "#1D4ED8",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            Sign in
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

export default FoodPartnerRegister;