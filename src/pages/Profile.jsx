import React, { useState, useEffect, useRef } from "react";
import "../styles/profile.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const getInitials = (name = "") => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [profileData, setProfileData] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRefs = useRef({});

    // Scroll to video if navigated from a video (via state)
    useEffect(() => {
        if (location.state && location.state.videoId && videos.length > 0) {
            const ref = videoRefs.current[location.state.videoId];
            if (ref && ref.scrollIntoView) {
                setTimeout(() => {
                    ref.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 200); // wait for render
            }
        }
    }, [videos, location.state]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://vercel-backend-psi-wheat.vercel.app/api/food/${id}`, { withCredentials: true })
            .then((res) => {
                setProfileData(res.data.foodPartner);
                setVideos(res.data.foodPartner.foodItems || []);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setProfileData(null);
                setVideos([]);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="profile-shell" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="loader" style={{ color: "var(--accent)", fontWeight: 700, fontSize: 22 }}>Loading profile…</div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="profile-shell" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "var(--danger)", fontWeight: 700, fontSize: 20 }}>Profile not found.</div>
            </div>
        );
    }

    return (
        <div className="profile-shell">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: "fixed",
                    top: 18,
                    left: 18,
                    zIndex: 20,
                    background: "var(--card)",
                    border: "none",
                    borderRadius: 9999,
                    boxShadow: "0 2px 8px rgba(2,6,23,0.10)",
                    padding: "8px 16px 8px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 600,
                    color: "var(--accent)",
                    fontSize: 15,
                    cursor: "pointer"
                }}
                aria-label="Go back"
            >
                <svg width="22" height="22" fill="none" stroke="var(--accent)" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                Back
            </button>

            <div className="profile-card" style={{ boxShadow: "0 8px 32px rgba(37,99,235,0.10)", background: "var(--glass)", backdropFilter: "blur(8px)" }}>
                {/* Avatar with fallback initials */}
                {profileData.avatar ? (
                    <img
                        className="profile-avatar"
                        src={profileData.avatar}
                        alt={profileData.businessName + " avatar"}
                        style={{ objectFit: "cover", border: "3px solid var(--accent)", background: "#fff" }}
                    />
                ) : (
                    <div
                        className="profile-avatar"
                        style={{ background: "var(--accent)", color: "#fff", fontSize: 32, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid var(--accent)", userSelect: "none" }}
                        aria-label="Avatar initials"
                    >
                        {getInitials(profileData.businessName)}
                    </div>
                )}

                {/* Business name and address */}
                <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 22, color: "var(--text)", marginBottom: 2 }}>{profileData.businessName}</div>
                    <div style={{ color: "var(--muted)", fontSize: 15 }}>{profileData.address}</div>
                </div>

                {/* Contact info row */}
                <div className="profile-info-row" style={{ justifyContent: "center", gap: 18, marginBottom: 10 }}>
                    <span className="profile-btn" style={{ background: "var(--accent-600)", fontSize: 14 }}>{profileData.contactName}</span>
                    <span className="profile-btn" style={{ background: "var(--accent-600)", fontSize: 14 }}>{profileData.phone}</span>
                </div>

                {/* Stats row */}
                <div className="profile-stats" style={{ marginTop: 18, marginBottom: 0 }}>
                    <div className="profile-stat">
                        <div className="profile-stat-label">Meals</div>
                        <div className="profile-stat-value">{profileData.totalMeals || 0}</div>
                    </div>
                    <div className="profile-stat">
                        <div className="profile-stat-label">Videos</div>
                        <div className="profile-stat-value">{videos.length}</div>
                    </div>
                </div>
            </div>

            {/* Videos grid */}
            <div className="profile-videos">
                {videos.length === 0 ? (
                    <div style={{ gridColumn: "1/-1", color: "var(--muted)", textAlign: "center", fontWeight: 500, fontSize: 16, padding: 24 }}>
                        No videos uploaded yet.
                    </div>
                ) : (
                    videos.map((v) => (
                        <div
                            className="profile-video"
                            key={v._id}
                            ref={el => (videoRefs.current[v._id] = el)}
                            style={{ position: "relative", overflow: "hidden", background: "#e6e6e9" }}
                        >
                            <video
                                className="feed-video"
                                style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: 10, transition: "box-shadow 0.2s" }}
                                src={v.video}
                                muted
                                loop
                                playsInline
                                poster={v.thumbnail || undefined}
                                tabIndex={0}
                                onMouseOver={e => e.currentTarget.play()}
                                onFocus={e => e.currentTarget.play()}
                                onMouseOut={e => e.currentTarget.pause()}
                                onBlur={e => e.currentTarget.pause()}
                                aria-label={v.description || "Video"}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Profile;