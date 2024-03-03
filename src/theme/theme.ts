"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
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
