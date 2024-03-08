"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ShowCodeModal from "../ShowCodeModal/ShowCodeModal";

interface NavbarProps {
  pageTitle: string;
  content?: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageTitle, content }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appRouter = useRouter();
  const pathname = usePathname();

  // Hitung posisi 'left' untuk Drawer berdasarkan lebar <main>
  const calculateLeftOffset = () => {
    const windowWidth = window.innerWidth;
    const mainMaxWidth = 425;
    const offset = (windowWidth - mainMaxWidth) / 2;
    return Math.max(offset, 0);
  };

  const drawerLeft = drawerOpen ? calculateLeftOffset() : -250;

  useEffect(() => {
    const handleResize = () => {
      if (drawerOpen) {
        setDrawerOpen(false);
        setTimeout(() => {
          setDrawerOpen(true);
        }, 300);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawerOpen]);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleBack = () => {
    appRouter.back();
  };

  const isHome = pathname === "/group";

  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {isHome ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
                onClick={handleBack}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              {pageTitle}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="QR code"
              onClick={handleDrawerToggle}
            >
              <QrCodeIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="share"
              onClick={handleShareClick}
            >
              <ShareIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {isHome && (
          <Box sx={{ width: "400px" }}>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  width: 250,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  position: "fixed",
                  left: `${drawerLeft}px`, // Set 'left' based on state
                  transition: "left 0.3s ease",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                }}
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
              >
                <List sx={{ width: "100%", padding: "32px" }}>
                  <ListItem>
                    <ListItemText
                      primary="Welcome to Genie!"
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                  <ListItemButton>
                    <ListItemText primary="Account" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="Feedback" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="About Genie" />
                  </ListItemButton>
                </List>
                <Box sx={{ textAlign: "center", pb: 2 }}>
                  <Link href="/privacy-policy" passHref>
                    <Typography
                      variant="caption"
                      sx={{
                        cursor: "pointer",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      v1.0.0 - Privacy Policy
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Drawer>
          </Box>
        )}
      </Box>
      <ShowCodeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        content={content}
      />
    </main>
  );
};

export default Navbar;
