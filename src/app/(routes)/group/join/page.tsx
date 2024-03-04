"use client";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Navbar from "@/components/Navbar/Navbar";
import JoinGroupInput from "@/components/JoinGroupInput";
import styles from "@/app/(routes)/group/join/page.module.css";

const JoinGroup = () => {
  const theme = useTheme();
  const handleJoin = (code: string) => {
    console.log("Join group code : " + code);
    // insert fetch group code function here
  };

  return (
    <>
      <Navbar pageTitle={"Join Group"} />
      <div className={styles.main}>
        <Typography sx={{ fontSize: 24, fontWeight: 500, marginBottom: "32px", color: theme.palette.text.primary }}>
          Enter Group Code
        </Typography>
        <JoinGroupInput onJoin={handleJoin} />
      </div>
    </>
  );
};

export default JoinGroup;
