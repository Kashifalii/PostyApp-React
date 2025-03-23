import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Other icons
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EventIcon from "@mui/icons-material/Event";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FlagIcon from "@mui/icons-material/Flag";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const drawerWidth = "19.5%";

export default function SideBar() {
  const [open, setOpen] = React.useState(false);
  const [postContent, setPostContent] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [fileError, setFileError] = React.useState(false);
  const [tagPeopleOpen, setTagPeopleOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [moreOptionsAnchor, setMoreOptionsAnchor] = React.useState(null);
  const [taggedUsers, setTaggedUsers] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const fileInputRef = React.useRef(null);

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPostContent("");
    setSelectedImage(null);
    setFileError(false);
    setTaggedUsers([]);
    setLocation("");
  };

  // File handling logic
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(URL.createObjectURL(file));
        setFileError(false);
      } else {
        setFileError(true);
        setSelectedImage(null);
      }
    }
  };

  // Tag people dialog
  const handleTagPeople = () => {
    setTagPeopleOpen(true);
  };

  // Location handling
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
          );
        },
        (error) => setLocation("Location access denied")
      );
    }
    setLocationOpen(true);
  };

  // More options menu
  const handleMoreOptions = (event) => {
    setMoreOptionsAnchor(event.currentTarget);
  };

  return (
    <>
      <Drawer
        className="sidebar"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            padding: "15px",
            borderRight: "none",
            backgroundColor: "#1c1c1c",
            color: "white",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {[
            {
              text: "Create",
              icon: <AddCircleOutlineRoundedIcon className="CreateIcon" />,
              onClick: handleOpen,
            },
            {
              text: "Explore",
              icon: <TravelExploreRoundedIcon className="ExploreIcon" />,
            },
            { text: "Groups", icon: <GroupsIcon className="GroupsIcon" /> },
            {
              text: "Marketplace",
              icon: <StorefrontIcon className="MarketIcon" />,
            },
            { text: "Events", icon: <EventIcon className="EventIcon" /> },
            { text: "Saved", icon: <BookmarkIcon className="SavedIcon" /> },
            { text: "Pages", icon: <FlagIcon className="PagesIcon" /> },
            {
              text: "Play Games",
              icon: <VideogameAssetIcon className="GameIcon" />,
            },
            {
              text: "Ads Manager",
              icon: <AutoGraphIcon className="AdsIcon" />,
            },
            { text: "Live Stream", icon: <LiveTvIcon className="LiveIcon" /> },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.onClick} sx={{ color: "inherit" }}>
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton className="SettingBtn" sx={{ color: "inherit" }}>
              <ListItemIcon sx={{ color: "inherit" }}>
                <AppSettingsAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Create Post Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-post-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Create Post</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ mr: 2 }}>U</Avatar>
            <Typography variant="subtitle1">User Name</Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="What's on your mind?"
            variant="outlined"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          {selectedImage && (
            <Box sx={{ position: "relative", mb: 2 }}>
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
              <IconButton
                onClick={() => setSelectedImage(null)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          <Box sx={{ border: "1px solid #ddd", borderRadius: 1, p: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Add to your post
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => fileInputRef.current.click()}>
                <Badge color="error" overlap="circular">
                  <AddPhotoAlternateIcon color="primary" />
                </Badge>
              </IconButton>

              <IconButton>
                <InsertEmoticonIcon color="warning" />
              </IconButton>

              <IconButton onClick={handleTagPeople}>
                <PersonAddAltIcon color="success" />
              </IconButton>

              <IconButton onClick={handleLocation}>
                <LocationOnIcon color="error" />
              </IconButton>

              <IconButton onClick={handleMoreOptions}>
                <MoreHorizIcon />
              </IconButton>
            </Stack>
          </Box>

          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />

          {fileError && (
            <Typography color="error" sx={{ mb: 2 }}>
              Only image files are allowed!
            </Typography>
          )}

          <Dialog open={tagPeopleOpen} onClose={() => setTagPeopleOpen(false)}>
            <DialogTitle>Tag People</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Search for people to tag in your post
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setTagPeopleOpen(false)}>Cancel</Button>
              <Button onClick={() => setTagPeopleOpen(false)}>Save</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={locationOpen} onClose={() => setLocationOpen(false)}>
            <DialogTitle>Add Location</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Location"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setLocationOpen(false)}>Cancel</Button>
              <Button onClick={() => setLocationOpen(false)}>Save</Button>
            </DialogActions>
          </Dialog>

          <Menu
            anchorEl={moreOptionsAnchor}
            open={Boolean(moreOptionsAnchor)}
            onClose={() => setMoreOptionsAnchor(null)}
          >
            <MenuItem>Change Background</MenuItem>
            <MenuItem>Schedule Post</MenuItem>
            <MenuItem>Privacy Settings</MenuItem>
          </Menu>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Discard
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!postContent && !selectedImage}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
