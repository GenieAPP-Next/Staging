"use client";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { BackNavbar, JoinGroupInput } from "@/components";
import styles from "@/app/(routes)/group/join/page.module.css";

const JoinGroup = () => {
  const theme = useTheme();
  const handleJoin = (code: string) => {
    console.log("Join group code : " + code);
  };

  return (
    <>
      <BackNavbar title={"Join Group"} />
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
