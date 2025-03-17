import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import { Box } from "@mui/material";
// import Videos from "../Pages/Videos";
// import Groups from "../Pages/Groups";
// import Store from "../Pages/Store";

function ContentWrapper() {
  return (
    <Box
      sx={{
        width: "68%",
        height: "100vh",
        padding: "20px",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/videos" element={<Videos />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/store" element={<Store />} /> */}
      </Routes>
    </Box>
  );
}

export default ContentWrapper;
