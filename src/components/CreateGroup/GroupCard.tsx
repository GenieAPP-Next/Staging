import React from "react";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import { getInitials } from "../utils/initialUtils";
import { GroupCardProps } from "./type";

const GroupCard: React.FC<GroupCardProps> = ({
  onGroupClick,
  groupName,
  category,
  memberCount,
  eventDate,
  avatarColor,
}) => {
  return (
    <Card
      sx={{ display: "flex", marginBottom: 2, cursor: "pointer" }}
      onClick={onGroupClick}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Avatar sx={{ marginRight: 2, backgroundColor: avatarColor }}>
          {getInitials(groupName)}
        </Avatar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "150px",
              }}
            >
              {groupName}
            </Typography>
            <Typography color="textSecondary">{category}</Typography>
          </Grid>
          <Grid item>
            <Typography>{`${memberCount} Members`}</Typography>
            <Typography color="textSecondary">{`${eventDate}`}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
