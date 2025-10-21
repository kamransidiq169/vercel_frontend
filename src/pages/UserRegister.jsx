import React from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName?.value || "";
    const email = form.email?.value || "";
    const password = form.password?.value || "";

    try {
      const response = await axios.post(
        "https://vercel-backend-psi-wheat.vercel.app/api/auth/user/register",
        { fullName, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <section
      className="auth-shell"
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
        className="auth-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#1D4ED8" }}>
            Create Your Account
          </h1>
          <p style={{ fontSize: "14px", color: "#4B5563" }}>
            Join us to upload, watch, and connect through video.
          </p>
        </header>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <a
            href="/fooduser/register"
            style={{
              fontSize: "14px",
              color: "#1D4ED8",
              fontWeight: "500",
              border: "1px solid #1D4ED8",
              padding: "8px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(29,78,216,0.05)")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Register as a Food Partner
          </a>
        </div>

        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <div>
            <label htmlFor="fullName" className="label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              className="input"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="input"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              required
              autoComplete="new-password"
              className="input"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            className="btn"
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
            Sign Up
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
          Already have an account?{" "}
          <a
            href="/user/login"
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

export default UserRegister;