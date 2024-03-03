'use client';
import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const AddButton = () => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push('/creategroup');
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      onClick={handleAddClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
