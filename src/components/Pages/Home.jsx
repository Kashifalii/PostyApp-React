import React from "react";
import StoriesSwiper from "../Stories/StoriesSwiper";
import Posts from "../Posts/Posts";
import { Box } from "@mui/material";

function Home() {
  return (
    <Box className="homePage">
      <StoriesSwiper />
      <Posts />
    </Box>
  );
}

export default Home;
