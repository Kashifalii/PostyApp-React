import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  Favorite,
  ChatBubble,
  Share,
  VolumeUp,
  VolumeOff,
  PlayArrow,
  Pause,
} from "@mui/icons-material";

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [pausedVideos, setPausedVideos] = useState({});
  const containerRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://api.pexels.com/videos/search?query=nature&per_page=10",
          {
            headers: {
              Authorization:
                "Nbok5e2gS0FqXWMVqeGXQnEEH0GGtY967jA5MbNQ53sAHDyDwdgBPCuX",
            },
          }
        );
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleLike = (videoId) => {
    setLiked((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoControl = (videoId) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (video.paused) {
        video.play();
        setPausedVideos((prev) => ({ ...prev, [videoId]: false }));
      } else {
        video.pause();
        setPausedVideos((prev) => ({ ...prev, [videoId]: true }));
      }
    }
  };

  const handleScroll = (e) => {
    const container = containerRef.current;
    if (container) {
      const { top, bottom } = container.getBoundingClientRect();
      const isInView = top < window.innerHeight && bottom > 0;

      if (!isInView) {
        e.preventDefault();
        container.scrollTop = container.scrollTop;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: false });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!videos.length) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          maxWidth: "430px",
          height: "calc(100vh - 120px)",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          position: "relative",
          borderRadius: "20px",
          backgroundColor: "#000",
          marginLeft: "55px",
        }}
      >
        {videos.map((video) => (
          <Box
            key={video.id}
            sx={{
              position: "relative",
              height: "calc(100vh - 120px)",
              width: "100%",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "black",
            }}
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            {/* Sound Control */}
            <IconButton
              onClick={toggleMute}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "white",
                zIndex: 2,
              }}
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>

            {/* Video Play/Pause Controls */}
            {hoveredVideo === video.id && (
              <IconButton
                onClick={() => handleVideoControl(video.id)}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  zIndex: 2,
                  fontSize: "3rem",
                }}
              >
                {pausedVideos[video.id] ? (
                  <PlayArrow fontSize="inherit" />
                ) : (
                  <Pause fontSize="inherit" />
                )}
              </IconButton>
            )}

            <video
              ref={(el) => (videoRefs.current[video.id] = el)}
              autoPlay
              loop
              muted={isMuted}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleVideoControl(video.id)}
            >
              <source src={video.video_files[0].link} type="video/mp4" />
            </video>

            {/* Right Action Icons */}
            <Box
              sx={{
                position: "absolute",
                bottom: "20%",
                right: "10px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                color: "white",
              }}
            >
              <IconButton onClick={() => handleLike(video.id)}>
                <Favorite sx={{ color: liked[video.id] ? "red" : "white" }} />
              </IconButton>
              <IconButton>
                <ChatBubble sx={{ color: "white" }} />
              </IconButton>
              <IconButton>
                <Share sx={{ color: "white" }} />
              </IconButton>
            </Box>

            {/* User Info */}
            <Box
              sx={{
                position: "absolute",
                bottom: "10%",
                left: "10px",
                color: "white",
              }}
            >
              <Typography variant="subtitle2">
                @{video.user.name.toLowerCase().replace(" ", "")}
              </Typography>
              <Typography variant="caption">{video.user.name}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {video.description || "Check description!"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Reels;
