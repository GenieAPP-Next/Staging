import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

interface GroupCardProps {
  groupName: string;
  category: string;
  memberCount: number;
  eventDate: string;
  avatarColor: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, category, memberCount, eventDate, avatarColor }) => {
    const getInitials = (name: string) => {
      const words = name.split(' ');
      const initials = words.length > 1 ? words[0].charAt(0) + words[1].charAt(0) : name.charAt(0);
      return initials.toUpperCase();
    };
  
    return (
      <Card sx={{ display: 'flex', marginBottom: 2 }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ marginRight: 2, backgroundColor: avatarColor }}>
            {getInitials(groupName)}
          </Avatar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">{groupName}</Typography>
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
