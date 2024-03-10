/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import AddButton from "@/components/Button/AddButton/AddButton";
import GroupCard from "@/components/CreateGroup/GroupCard";
import styles from "./DashboardData.module.scss";
import {
  avatarColors,
  getColorIndex,
} from "@/components/utils/avatarColorsUtils";

interface Group {
  group_id: number;
  name: string;
  category: string;
  event_date: string;
  memberCount: number;
}

interface Member {
  groupId: number;
  memberGroup: number;
}

interface GroupsData {
  group: Group[];
  member: Member[];
}

const DashboardData = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Assume loading initially

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      axios
        .get(`/api/findGroup/${userId}`)
        .then((response) => {
          const groupsData: GroupsData = response.data.data.data.groups;
          const enrichedGroups = groupsData.group.map((groupItem) => {
            const memberItem = groupsData.member.find(
              (m) => m.groupId === groupItem.group_id
            );
            return {
              ...groupItem,
              memberCount: memberItem ? memberItem.memberGroup : 0,
            };
          });

          setGroups(enrichedGroups);
        })
        .catch((error) => {
          console.error("Error fetching groups:", error);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading after API call completion or error
        });
    } else {
      setIsLoading(false); // No user ID found, so not loading
    }
  }, []);

  const renderGroups = () =>
    groups.map((group) => (
      <GroupCard
        key={group.group_id}
        groupName={group.name}
        category={group.category}
        memberCount={group.memberCount}
        eventDate={group.event_date}
        avatarColor={
          avatarColors[getColorIndex(group.name, avatarColors.length)]
        }
      />
    ));

  const renderNoGroupContent = () => (
    <div className={styles.dashboardWrapper}>
      <Box className={styles.noGroupContent}>
        <Typography variant="h6" className={styles.textH6}>
          Group Not Found
        </Typography>
        <Typography className={styles.textRegular}>
          Please create or join a group to start creating a split bill
        </Typography>
      </Box>
    </div>
  );

  return (
    <Box sx={{ padding: 3, height: "93.5vh", position: "relative" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : groups.length > 0 ? (
        renderGroups()
      ) : (
        renderNoGroupContent()
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          maxWidth: "400px",
        }}
      >
        <AddButton />
      </Box>
    </Box>
  );
};

export default DashboardData;
