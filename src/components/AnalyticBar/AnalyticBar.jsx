import React from "react";
import { Box } from "@mui/material";

function AnalyticBar() {
  return (
    <Box
      variant="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        backgroundColor: "#1c1c1c",
        height: "100vh",
        width: "12.5%",
      }}
    ></Box>
  );
}

export default AnalyticBar;
