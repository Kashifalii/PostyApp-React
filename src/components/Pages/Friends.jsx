import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  Modal,
  Typography,
  IconButton,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#636e6c" },
    secondary: { main: "#BE3144" },
    background: { default: "#121212", paper: "#1c1c1c" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const Friends = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentFriends, setCurrentFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [popper, setPopper] = useState({
    open: false,
    message: "",
    anchorEl: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/posts"),
        ]);

        // Create mock users to reach 60 total
        const apiUsers = usersRes.data;
        const mockUsers = Array.from({ length: 50 }, (_, i) => ({
          id: apiUsers.length + i + 1,
          name: `User ${apiUsers.length + i + 1}`,
          email: `user${apiUsers.length + i + 1}@example.com`,
          phone: `+1-555-${Math.floor(1000 + Math.random() * 9000)}`,
          company: {
            name: `Company ${i + 1}`,
            catchPhrase: `Catch phrase ${i + 1}`,
            bs: `BS ${i + 1}`,
          },
        }));

        const allUsers = [...apiUsers, ...mockUsers];
        setUsers(allUsers);
        setPosts(postsRes.data);
        setCurrentFriends(allUsers.slice(0, 20));
        setRequests(allUsers.slice(20, 40));
        setSuggestions(allUsers.slice(40, 60));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAction = (type, user, e) => {
    switch (type) {
      case "remove":
        setCurrentFriends((prev) => prev.filter((u) => u.id !== user.id));
        break;
      case "accept":
        setRequests((prev) => prev.filter((u) => u.id !== user.id));
        setCurrentFriends((prev) => [...prev, user]);
        showPopper(e, `Accepted ${user.name}'s request`);
        break;
      case "decline":
        setRequests((prev) => prev.filter((u) => u.id !== user.id));
        showPopper(e, `Declined ${user.name}'s request`);
        break;
      case "add":
        setSuggestions((prev) => prev.filter((u) => u.id !== user.id));
        showPopper(e, `Friend request sent to ${user.name}`);
        break;
      default:
        break;
    }
  };

  const showPopper = (e, message) => {
    setPopper({ open: true, message, anchorEl: e?.currentTarget });
    setTimeout(() => setPopper((prev) => ({ ...prev, open: false })), 2000);
  };

  const ProfileModal = ({ user }) => {
    if (!user) return null;

    const userPosts = posts.filter((p) => p.userId === user.id).slice(0, 3);

    return (
      <Modal open={!!user} onClose={() => setSelectedProfile(null)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 600 },
            p: 3,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <DialogActions>
            <IconButton onClick={() => setSelectedProfile(null)}>
              <CloseIcon />
            </IconButton>
          </DialogActions>

          <Avatar
            src={`https://i.pravatar.cc/200?u=${user.id}`}
            sx={{ width: 120, height: 120, mx: "auto" }}
          />

          <Typography variant="h5" align="center" mt={2} fontWeight={500}>
            {user.name}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            mt={1}
          >
            "{user.company?.catchPhrase}"
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" mb={2}>
                Current Friends
              </Typography>
              <List dense>
                {currentFriends.slice(0, 5).map((friend) => (
                  <ListItem key={friend.id}>
                    <ListItemAvatar>
                      <Avatar src={`https://i.pravatar.cc/50?u=${friend.id}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.name}
                      secondary={`${friend.id % 10} mutual friends`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" mb={2}>
                Recent Posts
              </Typography>
              {userPosts.map((post) => (
                <Paper
                  key={post.id}
                  sx={{ p: 2, mb: 2, bgcolor: "background.default" }}
                >
                  <Typography fontWeight={500}>{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body.slice(0, 80)}...
                  </Typography>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  };

  const UserCard = ({ user, actionType }) => {
    if (!user) return null;

    return (
      <Card
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Avatar
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          sx={{ width: 80, height: 80, mx: "auto", cursor: "pointer" }}
          onClick={() => setSelectedProfile(user)}
        />

        <Typography
          variant="subtitle1"
          align="center"
          mt={1}
          onClick={() => setSelectedProfile(user)}
          sx={{ cursor: "pointer" }}
        >
          {user.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mb={2}
        >
          {user.company?.bs}
        </Typography>

        <Chip
          label={`${(user.id % 15) + 5} mutual friends`}
          size="small"
          sx={{ mx: "auto", mb: 2 }}
        />

        {actionType === "current" && (
          <Button
            variant="outlined"
            onClick={(e) => handleAction("remove", user, e)}
            sx={{
              mt: "auto",
              color: "#BE3144",
              borderColor: "#BE3144",
              borderRadius: 50,
            }}
          >
            Remove Friend
          </Button>
        )}

        {actionType === "request" && (
          <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={(e) => handleAction("accept", user, e)}
              sx={{ borderRadius: 50 }}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              fullWidth
              onClick={(e) => handleAction("decline", user, e)}
              sx={{
                mt: "auto",
                color: "#BE3144",
                borderColor: "#BE3144",
                borderRadius: 50,
              }}
            >
              Decline
            </Button>
          </div>
        )}

        {actionType === "suggestion" && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            sx={{ mt: "auto", borderRadius: 50 }}
            onClick={(e) => handleAction("add", user, e)}
          >
            Add Friend
          </Button>
        )}
      </Card>
    );
  };

  const Section = ({ title, items, actionType, initialShow }) => {
    const [showMore, setShowMore] = useState(false);
    const visibleItems = showMore ? items : items.slice(0, initialShow);

    return (
      <Paper sx={{ mb: 4, p: 3, bgcolor: "background.paper" }}>
        <Typography variant="h6" mb={3} fontWeight={500}>
          {title}
        </Typography>
        <Grid container spacing={3}>
          {visibleItems.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <UserCard user={user} actionType={actionType} />
            </Grid>
          ))}
        </Grid>

        {items.length > initialShow && (
          <Button sx={{ mt: 3 }} onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : `Show More`}
          </Button>
        )}
      </Paper>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Section
          title="Current Friends"
          items={currentFriends}
          actionType="current"
          initialShow={4}
        />

        <Section
          title="Friend Requests"
          items={requests}
          actionType="request"
          initialShow={4}
        />

        <Section
          title="People You May Know"
          items={suggestions}
          actionType="suggestion"
          initialShow={4}
        />

        <ProfileModal user={selectedProfile} />

        <Popper open={popper.open} anchorEl={popper.anchorEl}>
          <Paper sx={{ p: 1.5, bgcolor: "primary.main", color: "#fff" }}>
            <Typography>{popper.message}</Typography>
          </Paper>
        </Popper>
      </Container>
    </ThemeProvider>
  );
};

export default Friends;
