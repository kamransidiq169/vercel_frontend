import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/feed.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/food/saved",
          {},
          { withCredentials: true }
        );
        const savedFoods = response.data.savedFoods || [];

        // Extract the populated food objects
        const extractedVideos = savedFoods
          .map((item) => item.food)
          .filter((f) => f && f.video); // ensure valid food and video

        setVideos(extractedVideos);
      } catch (err) {
        console.error("Failed to fetch saved items:", err);
      }
    };

    fetchSavedItems();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videoEls = Array.from(container.querySelectorAll("video"));
    videoEls.forEach((v) => {
      v.muted = true;
      v.playsInline = true;
    });

    const playVideo = async (video) => {
      if (!video) return;
      try {
        await video.play();
      } catch {
        try {
          video.muted = true;
          await video.play();
        } catch {}
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            playVideo(vid);
          } else {
            if (!vid.paused) {
              try {
                vid.pause();
              } catch {}
            }
          }
        });
      },
      { threshold: [0.25, 0.5, 0.75, 1] }
    );

    videoEls.forEach((v) => observer.observe(v));
    const first = videoEls.find((el) => el);
    if (first) playVideo(first);

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div className="feed-root" ref={containerRef} style={{ background: "var(--bg)", paddingBottom: 80 }}>
      <button
        onClick={() => navigate('/home')}
        style={{
          position: 'fixed',
          top: 18,
          left: 18,
          zIndex: 30,
          background: 'var(--card)',
          border: 'none',
          borderRadius: 9999,
          boxShadow: '0 2px 8px rgba(2,6,23,0.10)',
          padding: '8px 12px 8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontWeight: 600,
          color: 'var(--accent)',
          fontSize: 15,
          cursor: 'pointer'
        }}
        aria-label="Go back to home"
      >
        <svg width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>
      {videos.length === 0 ? (
        <div style={{ color: "white", textAlign: "center", marginTop: 40 }}>No saved videos yet.</div>
      ) : (
        videos.map((v) => (
          <div
            className="feed-item"
            key={v._id}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <video
              className="feed-video"
              src={v.video}
              muted
              loop
              playsInline
              style={{ borderRadius: 24 }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                bottom: 80,
                zIndex: 2,
                maxWidth: "70%",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  color: "var(--text)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 8,
                  padding: "8px 12px",
                  marginBottom: 10,
                  boxShadow: "0 2px 8px rgba(2,6,23,0.08)",
                  maxHeight: 44,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {v.description}
              </div>
            </div>
          </div>
        ))
      )}
    </div>

  );
};

export default Saved;