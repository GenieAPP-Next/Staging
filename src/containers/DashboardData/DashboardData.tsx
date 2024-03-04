import React from "react";
import { Box, Typography } from "@mui/material";
import AddButton from "@/components/Button/AddButton/AddButton";
import GroupCard from "@/components/CreateGroup/GroupCard";
import styles from "./DashboardData.module.scss";

const DashboardData = () => {
  // Predefined avatar colors
  const avatarColors = ["#FFC107", "#FF5722", "#673AB7", "#4CAF50", "#2196F3"];

  // Function to get a color index based on group name
  const getColorIndex = (str: string, arrayLength: number) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash + str.charCodeAt(i)) % arrayLength;
    }
    return hash;
  };

  // Example groups data
  const groups = [
    {
      name: "Group A",
      category: "Birthday",
      memberCount: 5,
      eventDate: "03/01/2023",
    },
    {
      name: "Group D",
      category: "Birthday",
      memberCount: 5,
      eventDate: "03/01/2023",
    },
    // ... more groups
  ];

  const renderGroups = () =>
    groups.map((group) => {
      const colorIndex = getColorIndex(group.name, avatarColors.length);
      return (
        <GroupCard
          key={group.name}
          groupName={group.name}
          category={group.category}
          memberCount={group.memberCount}
          eventDate={group.eventDate}
          avatarColor={avatarColors[colorIndex]}
        />
      );
    });

  const renderNoGroupContent = () => (
    <div className={styles.dashboardWrapper}>
      <Box className={styles.noGroupContent}>
        <Box
          component="img"
          src="/nodata.svg"
          alt="No Data"
          className={styles.noGroupImage}
        />
        <Box className={styles.noGroupText}>
          <Typography variant="h6" className={styles.textH6}>
            Group Not Found
          </Typography>
          <Typography className={styles.textRegular}>
            Please create or join a group to start creating a split bill
          </Typography>
        </Box>
      </Box>
    </div>
  );

  return (
    <Box sx={{ padding: 3 }}>
      {groups.length > 0 ? renderGroups() : renderNoGroupContent()}
      <AddButton />
    </Box>
  );
};

export default DashboardData;
