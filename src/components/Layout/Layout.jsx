import React from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

function Layout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Box
        sx={{ display: "flex", overflow: "hidden", backgroundColor: "#000" }}
      >
        <SideBar />
        <ContentWrapper />
      </Box>
    </Box>
  );
}

export default Layout;
