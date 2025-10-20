import React, { useEffect, useRef, useState } from "react";
import "../styles/feed.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
// const sampleVideos = [
//   { id: 1, src: "https://ik.imagekit.io/kamransidiq/7c700c96-6f39-471c-9317-d0d27798b5fc_AYG6CedbD", desc: "Fresh meals daily — healthy, affordable, and delivered fast." },
//   { id: 2, src: "https://ik.imagekit.io/kamransidiq/7c700c96-6f39-471c-9317-d0d27798b5fc_AYG6CedbD", desc: "Try our chef special. Limited time offer on bulk orders." },
//   { id: 3, src: "https://ik.imagekit.io/kamransidiq/7c700c96-6f39-471c-9317-d0d27798b5fc_AYG6CedbD", desc: "Organic ingredients and locally sourced produce for every plate." },
// ];

export const HomePage = () => {
  const containerRef = useRef(null);
const [videos,setVideos]=useState([])
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Query the rendered video elements inside the container
    const videoEls = Array.from(container.querySelectorAll("video"));

    // Ensure videos are muted to allow autoplay in most browsers
    videoEls.forEach((v) => {
      v.muted = true;
      v.playsInline = true;
    });

    const playVideo = async (video) => {
      if (!video) return;
      try {
        await video.play();
      } catch (err) {
        // Autoplay may be blocked; mute and try again
        try {
          video.muted = true;
          await video.play();
        } catch (e) {
          // If still blocked, ignore silently — user can play manually
        }
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
              try { vid.pause(); } catch (e) {}
            }
          }
        });
      },
      { threshold: [0.25, 0.5, 0.75, 1] }
    );

    videoEls.forEach((v) => observer.observe(v));

    // Try to play the first visible video
    const first = videoEls.find((el) => el); // first element if any
    if (first) playVideo(first);

    return () => {
      observer.disconnect();
    };
  }, [videos]);
 useEffect(()=>{
     axios.get("https://vercel-backend-psi-wheat.vercel.app/api/food",{withCredentials:true}).then(res=>{setVideos(res.data.foodItems);
     }).catch(err=>console.log(err))
 },[])

const handleLikeCount = async (item) => {
  try {
    const response = await axios.post(
      "https://vercel-backend-psi-wheat.vercel.app/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    const isLikedNow = !!response.data.like;
    const updatedCount = response.data.likeCount;

    setVideos(videos.map(v =>
      v._id === item._id
        ? {
            ...v,
            likeCount: updatedCount,
            isLikedByUser: isLikedNow
          }
        : v
    ));
  } catch (err) {
    console.error("Like toggle failed", err);
  }
};
const handleSaveCount = async (item) => {
  try {
    const response = await axios.post("https://vercel-backend-psi-wheat.vercel.app/api/food/save", { foodId: item._id }, { withCredentials: true });

    const isSavedNow = !!response.data.save;

  
    

setVideos(videos.map(v =>
  v._id === item._id
    ? {
        ...v,
        saveCount: isSavedNow
          ? (v.saveCount || 0) + 1
          : Math.max((v.saveCount || 1) - 1, 0),
        isSavedByUser: isSavedNow // ✅ corrected key name
      }
    : v
));
  } catch (err) {
    console.error("Like toggle failed", err);
  }
};

  return (
    <div className="feed-root" ref={containerRef} style={{position:"relative", background:"var(--bg)"}}>
      {videos.map((v) => (
        <div className="feed-item" key={v._id} style={{position:"relative", display:"flex", flexDirection:"column", justifyContent:"flex-end"}}>
         <video
  className="feed-video"
  src={v.video}
  muted
  loop
  playsInline
  style={{
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  }}
/>

          {/* Right-side icons */}
            <div style={{position:"absolute", right:18, bottom:220, display:"flex", flexDirection:"column", gap:22, alignItems:"center", zIndex:2}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} onClick={()=>handleLikeCount(v)}>
<svg
  width="28"
  height="28"
  fill={v.isLikedByUser ? "red" : "white"} // white when liked
  stroke="white"
  strokeWidth="2"
  viewBox="0 0 24 24"
>
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
</svg>
              <span style={{color:"white", fontSize:13, marginTop:2}}>likes : {v.isLikedByUser ? 1 : 0}</span>
              {/* If you want to show total likes instead, use: */}
              {/* <div style={{fontSize:12,color:'rgba(255,255,255,0.85)'}}>total: {v.likeCount || 0}</div> */}
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} onClick={()=>handleSaveCount(v)}>
              <svg width="26" height="26"  fill={v.isSavedByUser ? "yellow" : "none"}
 stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              <span style={{color:"white", fontSize:13, marginTop:2}}>Save : {v.isSavedByUser ? 1:0 }</span>
            </div>
            {/* <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
              <svg width="26" height="26" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span style={{color:"white", fontSize:13, marginTop:2}}>Comment:{v.comments || 45}</span>
            </div> */}
          </div>

          {/* Description and visit store button */}
          <div style={{position:"absolute", left:18, bottom:80, zIndex:2, maxWidth:"70%"}}>
            <div style={{background:"var(--card)", color:"var(--text)", fontWeight:600, fontSize:15, borderRadius:8, padding:"8px 12px", marginBottom:10, boxShadow:"0 2px 8px rgba(2,6,23,0.08)", maxHeight:44, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical"}}>{v.description}</div>
            <Link
              to={`/foodPartner/${v.foodPartner}`}
              className="visit-btn"
              aria-label={`Visit store for ${v.foodPartner}`}
              style={{
                width: "100%",
                display: "block",
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: 18,
                background: "linear-gradient(90deg, var(--accent-600), var(--accent))",
                color: "#fff",
                textAlign: "center",
                padding: "15px 0",
                boxShadow: "0 6px 24px rgba(37,99,235,0.13)",
                letterSpacing: 0.3,
                marginTop: 4,
                cursor: "pointer",
                border: "none",
                outline: "none",
                transition: "transform 0.13s cubic-bezier(.4,2,.6,1), box-shadow 0.18s",
                listStyleType: "none",
                textDecoration: "none",
              }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              visit store
            </Link>
          </div>
        </div>
      ))}
      {/* Bottom navigation bar */}
      <nav style={{position:"fixed", left:0, right:0, bottom:0, height:62, background:"var(--card)", borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-around", alignItems:"center", zIndex:10, boxShadow:"0 -2px 12px rgba(2,6,23,0.06)"}}>
        <Link to="/" style={{display:"flex", flexDirection:"column", alignItems:"center", color:"var(--accent)", textDecoration:"none", fontWeight:600}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>
</svg>
          <span style={{fontSize:13}}>home</span>
        </Link>
        <Link to="/saved" style={{display:"flex", flexDirection:"column", alignItems:"center", color:"var(--accent)", textDecoration:"none", fontWeight:600}}>
          <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <span style={{fontSize:13}}>saved</span>
        </Link>
      </nav>
    </div>
  );
};

