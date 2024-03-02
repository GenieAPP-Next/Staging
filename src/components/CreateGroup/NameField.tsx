import React from 'react';
import { TextField } from '@mui/material';

interface NameFieldProps {
  name: string;
  onNameChange: (name: string) => void;
}

const NameField: React.FC<NameFieldProps> = ({ name, onNameChange }) => {
  return (
    <TextField
      fullWidth
      label="Name"
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
      variant="outlined"
    />
  );
};

export default NameField;
