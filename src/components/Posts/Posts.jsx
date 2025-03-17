import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Box,
  CircularProgress,
  Alert,
  Popper,
  Button,
  styled,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Share,
  BookmarkBorder,
  Bookmark,
  Send,
  MoreVert,
} from "@mui/icons-material";

const DarkCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  marginBottom: theme.spacing(4),
  maxWidth: 600,
  "& .MuiTypography-body1": {
    color: "#e0e0e0",
    fontSize: "0.9rem",
  },
  "& .MuiTypography-body2": {
    color: "#b0b0b0",
    fontSize: "0.8rem",
  },
  "& .MuiSvgIcon-root": {
    color: "#ffffff",
  },
}));

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes || 0);
  const [isSaved, setIsSaved] = useState(false);
  const [postComments, setPostComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [saveAnchorEl, setSaveAnchorEl] = useState(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPostLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = (event) => {
    setIsSaved(!isSaved);
    setSaveAnchorEl(event.currentTarget);
    setTimeout(() => setSaveAnchorEl(null), 2000);
  };

  const handleShare = (event) => {
    setShareAnchorEl(shareAnchorEl ? null : event.currentTarget);
  };

  const closeShareMenu = () => {
    setShareAnchorEl(null);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setPostComments((prev) => [
        ...prev,
        {
          postId: post.id,
          id: Date.now(),
          name: post.user.name,
          body: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  const visibleComments = showAllComments
    ? postComments
    : postComments.slice(0, 2);

  return (
    <DarkCard>
      <CardHeader
        avatar={<Avatar src={post.avatar} sx={{ bgcolor: "#4a4a4a" }} />}
        title={
          <Typography
            variant="subtitle2"
            sx={{ color: "#ffffff", fontSize: "0.95rem" }}
          >
            {post.user.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ color: "#b0b0b0", fontSize: "0.75rem" }}
          >
            @{post.user.username.toLowerCase()}
          </Typography>
        }
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
      />

      <CardMedia
        component="img"
        image={post.image}
        alt="Post image"
        sx={{ height: 500 }}
        onDoubleClick={handleLike}
      />

      <CardActions disableSpacing>
        <IconButton onClick={handleLike}>
          {isLiked ? (
            <Favorite sx={{ color: "#ff3040" }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        <IconButton>
          <ChatBubbleOutline />
        </IconButton>
        <IconButton onClick={handleShare}>
          <Share />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleSave}>
          {isSaved ? (
            <Bookmark sx={{ color: "#ffd700" }} />
          ) : (
            <BookmarkBorder />
          )}
        </IconButton>
      </CardActions>

      <CardContent>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: "#ffffff",
            fontSize: "0.9rem",
          }}
        >
          {postLikes.toLocaleString()} likes
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ color: "#e0e0e0", fontSize: "0.85rem" }}
        >
          <span style={{ fontWeight: "bold", color: "#ffffff" }}>
            {post.user.username}
          </span>{" "}
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#b0b0b0", fontSize: "0.8rem" }}
        >
          {post.body}
        </Typography>
      </CardContent>

      <CardContent>
        {visibleComments.map((comment) => (
          <Typography
            key={comment.id}
            variant="body2"
            sx={{ mb: 1, color: "#e0e0e0", fontSize: "0.8rem" }}
          >
            <span style={{ fontWeight: "bold", color: "#ffffff" }}>
              {comment.name}
            </span>{" "}
            {comment.body}
          </Typography>
        ))}
        {postComments.length > 2 && (
          <Button
            onClick={() => setShowAllComments(!showAllComments)}
            sx={{
              color: "#b0b0b0",
              textTransform: "none",
              fontSize: "0.75rem",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {showAllComments ? "Show less comments" : "View more comments"}
          </Button>
        )}
      </CardContent>

      <CardContent>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleComment()}
          InputProps={{
            sx: {
              color: "#ffffff",
              "&:before": { borderColor: "#4a4a4a" },
              "&:hover:not(.Mui-disabled):before": { borderColor: "#ffffff" },
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  sx={{ color: newComment.trim() ? "#ffffff" : "#666666" }}
                >
                  <Send fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </CardContent>

      {/* Save Notification */}
      <Popper
        open={!!saveAnchorEl}
        anchorEl={saveAnchorEl}
        placement="top"
        sx={{ zIndex: 1 }}
      >
        <Box
          sx={{
            bgcolor: "#333333",
            color: "#ffffff",
            p: 1,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          Post {isSaved ? "saved" : "unsaved"}
        </Box>
      </Popper>

      {/* Share Popper */}
      <Popper
        open={!!shareAnchorEl}
        anchorEl={shareAnchorEl}
        placement="top"
        sx={{ zIndex: 1 }}
      >
        <Box
          sx={{
            bgcolor: "#333333",
            color: "#ffffff",
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Button
            fullWidth
            sx={{
              color: "#ffffff",
              fontSize: "0.8rem",
              justifyContent: "flex-start",
              px: 2,
              py: 1,
            }}
            onClick={closeShareMenu}
          >
            Copy link
          </Button>
          <Button
            fullWidth
            sx={{
              color: "#ffffff",
              fontSize: "0.8rem",
              justifyContent: "flex-start",
              px: 2,
              py: 1,
            }}
            onClick={closeShareMenu}
          >
            Share to story
          </Button>
          <Button
            fullWidth
            sx={{
              color: "#ffffff",
              fontSize: "0.8rem",
              justifyContent: "flex-start",
              px: 2,
              py: 1,
            }}
            onClick={closeShareMenu}
          >
            Send to...
          </Button>
        </Box>
      </Popper>
    </DarkCard>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes, commentsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);

        const postsData = await postsRes.json();
        const usersData = await usersRes.json();
        const commentsData = await commentsRes.json();

        // Assign unique users to each post
        const combinedPosts = postsData.slice(0, 9).map((post, index) => {
          const user = usersData[index % usersData.length]; // Cycle through users
          return {
            ...post,
            user: {
              ...user,
              username:
                user.username || user.name.replace(/\s+/g, "").toLowerCase(),
            },
            comments: commentsData.filter(
              (comment) => comment.postId === post.id
            ),
            image: `https://picsum.photos/500/500?random=${post.id}`,
            avatar: `https://i.pravatar.cc/150?img=${user.id}`,
            likes: Math.floor(Math.random() * 1000),
          };
        });

        setPosts(combinedPosts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress sx={{ color: "#ffffff" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", mt: 2 }}>
        <Alert
          severity="error"
          sx={{ backgroundColor: "#333333", color: "#ffffff" }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {posts.map((post) => (
        <Box key={post.id} sx={{ display: "flex", justifyContent: "center" }}>
          <Post post={post} />
        </Box>
      ))}
    </Box>
  );
};

export default Posts;
