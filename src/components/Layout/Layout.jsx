import React from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import AnalyticBar from "../AnalyticBar/AnalyticBar";

function Layout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Box
        sx={{ display: "flex", overflow: "hidden", backgroundColor: "#000" }}
      >
        <SideBar />
        <ContentWrapper />
        <AnalyticBar />
      </Box>
    </Box>
  );
}

export default Layout;
