"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#4285F4",
    },
    success: {
      main: "#00AA13",
    },
    error: {
      main: "#DC362E",
    },
    info: {
      main: "#FFC000",
    },
    text: {
      primary: "#48464C",
      secondary: "#1D1B20",
    },
  },
});

export default theme;