import React from 'react';
import { Box, Typography } from '@mui/material';
import AddButton from './AddButton';


const DashboardData = () => {
  // This would be replaced with server-side data fetching logic
  const groups = [];

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
      {groups.length > 0 ? (
        // Logic to render groups goes here
        <Box>Render Group Data</Box>
      ) : (
        renderNoGroupContent()
      )}
      <AddButton /> {/*client component*/}
    </Box>
  );
};

export default DashboardData;
