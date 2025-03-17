import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          "& .MuiToolbar-root": {
            background: "#1c1c1c",
            color: "#fff",
            padding: "12px 20px",
            justifyContent: "space-between",
            borderBottom: "1px solid #323232",
          },
          "& .css-96uuyl": {
            borderRadius: "50px",
            display: "flex",
            flexDirection: "row-reverse",
            background: "#252424",
            border: "1px solid rgb(39, 39, 39)",
            height: "fit-content",
            margin: 0,
            "&:hover": {
              background: "#232323",
            },
          },
          "& .MuiInputBase-input": {
            padding: "10.5px 15px !important",
            fontSize: "14px",
            width: "26.5ch !important",
          },
          "& .MuiInputBase-root": {
            width: "30ch",
          },
          "& .MuiPaper-root": {
            top: "180px !important",
            backgroundColor: "#1c1c1c",
          },
          "& .navIcons": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "80px",
            paddingLeft: "180px",
          },
          "& .navIcons .MuiIconButton-root .MuiSvgIcon-root": {
            width: "42px",
            height: "42px",
            padding: "5px",
            borderRadius: "5px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "#252424",
              transform: "scale(1.1)",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          top: "80px !important",
          backgroundColor: "rgb(54, 54, 54)",
          color: "#fff",
          width: "30ch",
          "& .MuiMenuItem-root": {
            display: "flex",
            gap: "10px",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          top: "85px !important",
          "& .MuiSvgIcon-root": {
            color: "#fff",
            width: "32px",
            height: "32px",
          },
          "& .CreateIcon": {
            color: "#ef233c",
          },
          "& .ExploreIcon": {
            color: "#4c956c",
          },
          "& .GroupsIcon": {
            color: "#48cae4",
          },
          "& .MarketIcon": {
            color: "#fca311",
          },
          "& .EventIcon": {
            color: "#d62246",
          },
          "& .SavedIcon": {
            color: "#9d4edd",
          },
          "& .PagesIcon": {
            color: "#eb6424",
          },
          "& .GameIcon": {
            color: "#fe5f55",
          },
          "& .AdsIcon": {
            color: "#7b2cbf",
          },
          "& .LiveIcon": {
            color: "#8d5b4c",
          },
          "& .SettingBtn": {
            marginTop: "150px",
          },
          "& .MuiList-root": {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          },
          "& .MuiDivider-root": {
            backgroundColor: "#323232",
            margin: "10px 0",
          },
          "& .MuiTypography-root": {
            fontWeight: "600",
            letterSpacing: ".3px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: "100%",
          marginBottom: "0 !important",
        },
      },
    },
  },
});

export default theme;
