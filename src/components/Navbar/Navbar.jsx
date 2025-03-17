// Navbar.jsx
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../assets/Images/logo.webp";
import profileImg from "../../assets/Images/profileImg.jpg";
import { Link } from "react-router-dom";

// Icons
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import FlipCameraAndroidOutlinedIcon from "@mui/icons-material/FlipCameraAndroidOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
// Navigation icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <HelpOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        Help & Support
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <FeedbackOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        Give Feedback
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <FlipCameraAndroidOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        Switch Account
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ExitToAppOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#242526" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "cover",
                mr: 2,
              }}
            />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          {/* Center Navigation Icons */}
          <Box sx={{ display: "flex", gap: 9 }}>
            <IconButton
              component={Link}
              to="/"
              size="large"
              color="inherit"
              aria-label="home"
            >
              <HomeRoundedIcon fontSize="large" />
            </IconButton>
            <IconButton
              component={Link}
              to="/videos"
              size="large"
              color="inherit"
              aria-label="videos"
            >
              <OndemandVideoRoundedIcon fontSize="large" />
            </IconButton>
            <IconButton
              component={Link}
              to="/groups"
              size="large"
              color="inherit"
              aria-label="groups"
            >
              <GroupRoundedIcon fontSize="large" />
            </IconButton>
            <IconButton
              component={Link}
              to="/store"
              size="large"
              color="inherit"
              aria-label="store"
            >
              <StoreRoundedIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="medium" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton size="medium" color="inherit" sx={{ mx: 1 }}>
              <Badge badgeContent={17} color="error">
                <NotificationsIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              edge="end"
              aria-label="account"
            >
              <Box
                component="img"
                src={profileImg}
                alt="Profile"
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: "3px solid #3A3B3C",
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
