import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email?.value || "";
    const password = form.password?.value || "";

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/home");
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
            Welcome Back
          </h1>
          <p style={{ fontSize: "14px", color: "#4B5563", marginTop: "6px" }}>
            Sign in to continue to your account
          </p>
        </header>

        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
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
              required
              placeholder="Your password"
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

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "14px",
            color: "#4B5563",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/user/register"
            style={{
              color: "#1D4ED8",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            Create one
          </a>
        </div>

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <a
            href="/foodpartner/login"
            style={{
              fontSize: "14px",
              color: "#1D4ED8",
              fontWeight: "500",
              border: "1px solid #1D4ED8",
              padding: "8px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(29,78,216,0.05)")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Login as a Food Partner
          </a>
        </div>
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

export default UserLogin;