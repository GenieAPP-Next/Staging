import React from 'react';
import { Box, Typography } from '@mui/material';
import AddButton from '@/components/Button/AddButton/AddButton';
import GroupCard from '@/components/CreateGroup/GroupCard';

const DashboardData = () => {
  // Predefined avatar colors
  const avatarColors = ['#FFC107', '#FF5722', '#673AB7', '#4CAF50', '#2196F3'];

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
    { name: 'Group A', category: 'Birthday', memberCount: 5, eventDate: '03/01/2023' },
    { name: 'Group D', category: 'Birthday', memberCount: 5, eventDate: '03/01/2023' },
    // ... more groups
  ];

  const renderGroups = () => (
    groups.map(group => {
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
    })
  );

  const renderNoGroupContent = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        gap: 2,
        pt: 8,
      }}
    >
      <Box
        component="img"
        src="/nodata.svg"
        alt="No Data"
        sx={{ maxWidth: '10%', height: 'auto' }}
      />
      <Box sx={{mt: 10}}>
        <Typography variant="h6" sx={{ color: "#48464C" }}>
          Group Not Found
        </Typography>
        <Typography sx={{ color: "#48464C" }}>
          Please create or join a group to start creating a split bill
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ padding: 3 }}>
      {groups.length > 0 ? renderGroups() : renderNoGroupContent()}
      <AddButton />
    </Box>
  );
};

export default DashboardData;
