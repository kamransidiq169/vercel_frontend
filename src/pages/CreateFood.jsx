import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateFood = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    } else {
      setVideoUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("video", e.target.video.files[0]);

    const response = await axios.post("https://vercel-backend-psi-wheat.vercel.app/api/food", formData, {
      withCredentials: true,
    });
    console.log(response.data);
    navigate("/user/login");
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
          maxWidth: "480px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: "36px 28px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
              <button
        onClick={() => navigate('/foodpartner/login')}
        style={{
          position: 'fixed',
          top:10,
          left: 13,
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
        <h2
          style={{
            marginBottom: "24px",
            color: "#1D4ED8",
            fontWeight: "700",
            fontSize: "24px",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          Create Food
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label htmlFor="video" style={labelStyle}>
              Food Video
            </label>
            <input
              type="file"
              accept="video/*"
              id="video"
              name="video"
              onChange={handleVideoChange}
              style={inputStyle}
            />
            {videoUrl && (
              <video
                src={videoUrl}
                controls
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginTop: "10px",
                  maxHeight: "220px",
                  backgroundColor: "#F3F4F6",
                }}
              />
            )}
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" "
              required
              autoComplete="off"
              style={inputStyle}
            />
            <label htmlFor="name" style={floatingLabelStyle}>
              Food Name
            </label>
          </div>

          <div style={{ position: "relative" }}>
            <textarea
              id="desc"
              name="description"
              rows={3}
              placeholder=" "
              maxLength={120}
              required
              style={textareaStyle}
            />
            <label htmlFor="desc" style={floatingLabelStyle}>
              Description
            </label>
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
            Create Food
          </button>
        </form>
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

const textareaStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #D1D5DB",
  fontSize: "15px",
  outline: "none",
  resize: "vertical",
  transition: "border-color 0.3s ease",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
};

const floatingLabelStyle = {
  position: "absolute",
  top: "-6px",
  left: "12px",
  backgroundColor: "#fff",
  padding: "0 4px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#374151",
};

export default CreateFood;