import { useNavigate } from "react-router-dom";

export const FirstView = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "100vh",
        width: "100vw",
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.dxKtPcxGGN3CUrvJ6PbGLgHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="App Logo"
          style={{
            width: 56,
            height: 56,
            marginBottom: 16,
            borderRadius: 12,
            objectFit: "cover",
          }}
        />

        <h1
          style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "#1D4ED8",
            marginBottom: "6px",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          Welcome to CakeVilla
        </h1>

        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#CBD5E1",
            margin: "12px 0 18px 0",
          }}
        />

        <p
          style={{
            color: "#64748B",
            fontSize: "15px",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Sign in to explore food, order, and connect with partners.
        </p>

        <button
          style={{
            width: "100%",
            padding: "13px 0",
            fontSize: "16px",
            borderRadius: "10px",
            backgroundColor: "#1D4ED8",
            color: "#fff",
            fontWeight: "600",
            border: "none",
            marginBottom: "12px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1E40AF")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
          onClick={() => navigate("/user/login")}
        >
          User Login
        </button>

        <button
          style={{
            width: "100%",
            padding: "13px 0",
            fontSize: "16px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            color: "#1D4ED8",
            fontWeight: "600",
            border: "1.5px solid #1D4ED8",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#EFF6FF")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
          onClick={() => navigate("/user/register")}
        >
          User Register
        </button>

        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "18px",
            color: "#64748B",
            fontSize: "13px",
          }}
        >
          &copy; {new Date().getFullYear()} Food App
        </div>
      </div>
    </section>
  );
};