import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Avatar,
  Modal,
  LinearProgress,
  styled,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useSwipeable } from "react-swipeable";
import {
  Favorite,
  FavoriteBorder,
  Send,
  ChevronLeft,
  ChevronRight,
  MoreHoriz,
} from "@mui/icons-material";

const InstagramStoryContainer = styled(Box)({
  position: "relative",
  width: "100%",
  maxWidth: "500px",
  height: "calc(100vh - 40px)",
  maxHeight: "100vh",
  margin: "20px auto",
  backgroundColor: "#000",
  borderRadius: "4px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

const ProgressContainer = styled(Box)({
  position: "absolute",
  top: "12px",
  width: "94%",
  left: "3%",
  display: "flex",
  gap: "4px",
  zIndex: 3,
});

const ContentContainer = styled(Box)({
  flex: 1,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

const ImageWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StoryViewer = ({ open, onClose, stories, initialIndex }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [comment, setComment] = useState("");
  const STORY_DURATION = 5000;

  const resetState = useCallback(() => {
    setActiveIndex(initialIndex);
    setProgress(0);
    setIsPaused(false);
    setComment("");
  }, [initialIndex]);

  useEffect(() => {
    if (open) resetState();
  }, [open, resetState]);

  const handleSwipe = useCallback(
    (direction) => {
      setProgress(0);
      if (direction === "left") {
        if (activeIndex >= stories.length - 1) onClose();
        else setActiveIndex((prev) => prev + 1);
      } else {
        if (activeIndex <= 0) onClose();
        else setActiveIndex((prev) => prev - 1);
      }
    },
    [activeIndex, stories.length, onClose]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = (elapsed / STORY_DURATION) * 100;

      if (newProgress >= 100) {
        handleSwipe("left");
        return;
      }

      setProgress(newProgress);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    if (open && !isPaused) {
      animationFrame = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [open, isPaused, activeIndex, handleSwipe, STORY_DURATION]);

  const handleLike = () => {
    stories[activeIndex].likes += stories[activeIndex].liked ? -1 : 1;
    stories[activeIndex].liked = !stories[activeIndex].liked;
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      stories[activeIndex].comments.push(comment);
      setComment("");
    }
  };

  if (!stories[activeIndex]) return null;

  const currentStory = stories[activeIndex];

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.95)" } }}
    >
      <InstagramStoryContainer {...handlers}>
        <ProgressContainer>
          {stories.map((_, index) => (
            <LinearProgress
              key={index}
              variant="determinate"
              value={
                activeIndex === index ? progress : index < activeIndex ? 100 : 0
              }
              sx={{
                flexGrow: 1,
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.3)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#fff",
                  transition: "none",
                },
              }}
            />
          ))}
        </ProgressContainer>

        <Box
          sx={{
            position: "absolute",
            top: "28px",
            left: "12px",
            display: "flex",
            alignItems: "center",
            zIndex: 3,
            color: "#fff",
          }}
        >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                width: 56,
                height: 56,
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                top: -2,
                left: -2,
              },
            }}
          >
            <Avatar
              src={currentStory.avatar}
              sx={{
                width: 52,
                height: 52,
                border: "2px solid white",
                position: "relative",
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
            {currentStory.user}
          </Typography>
          <Typography variant="caption" sx={{ ml: 1, opacity: 0.8 }}>
            • {currentStory.timestamp}
          </Typography>
        </Box>

        <ContentContainer>
          <ImageWrapper>
            <Box
              component="img"
              src={currentStory.content}
              key={activeIndex}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/500/800";
              }}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </ImageWrapper>
        </ContentContainer>

        <IconButton
          sx={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 3,
            "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
          }}
          onClick={() => handleSwipe("right")}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 3,
            "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
          }}
          onClick={() => handleSwipe("left")}
        >
          <ChevronRight fontSize="large" />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
            p: 2,
          }}
        >
          <Box
            sx={{
              mb: 2,
              maxHeight: "120px",
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {currentStory.comments.map((comment, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: "#fff", mb: 1 }}
              >
                <strong>{currentStory.user}</strong> {comment}
              </Typography>
            ))}
          </Box>

          <form onSubmit={handleComment}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Send message"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  borderRadius: "24px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleLike}
                      sx={{ color: "#fff", mr: 1 }}
                    >
                      {currentStory.liked ? (
                        <Favorite sx={{ color: "#ed4956" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <IconButton type="submit" edge="end" sx={{ color: "#fff" }}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Box>

        <IconButton
          sx={{
            position: "absolute",
            top: "24px",
            right: "12px",
            color: "#fff",
            zIndex: 3,
          }}
        >
          <MoreHoriz />
        </IconButton>
      </InstagramStoryContainer>
    </Modal>
  );
};

const StoriesSwiper = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const users = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        ).then((res) => res.json());

        const storiesData = users.slice(0, 8).map((user, index) => ({
          id: user.id,
          user: user.name,
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          content: `https://picsum.photos/500/800?random=${index}`,
          likes: Math.floor(Math.random() * 100),
          comments: [],
          timestamp: `${Math.floor(Math.random() * 24) + 1}h`,
          liked: false,
        }));

        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          padding: "8px",
          justifyContent: "center",
          gap: 2,
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {stories.length === 0 ? (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Loading stories...
          </Typography>
        ) : (
          stories.map((story, index) => (
            <Box
              key={story.id}
              onClick={() => {
                setSelectedIndex(index);
                setOpen(true);
              }}
              sx={{
                position: "relative",
                cursor: "pointer",
                flexShrink: 0,
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #64b5f6 0%, #42a5f5 25%, #2196f3 50%, #1e88e5 75%, #1976d2 100%)",
                  top: -2,
                  left: -2,
                },
              }}
            >
              <Avatar
                src={story.avatar}
                sx={{
                  width: 52,
                  height: 52,
                  border: "2px solid white",
                  position: "relative",
                }}
              />
            </Box>
          ))
        )}
      </Box>

      <StoryViewer
        open={open}
        onClose={() => setOpen(false)}
        stories={stories}
        initialIndex={selectedIndex}
      />
    </Box>
  );
};

export default StoriesSwiper;
