import React from "react";
import { TextField } from "@mui/material";
import { NameFieldProps } from "./type";

const NameField: React.FC<NameFieldProps> = ({ name, onNameChange }) => {
  return (
    <TextField
      fullWidth
      label="Name"
      value={name}
      size="small"
      onChange={(e) => {
        onNameChange(e.target.value);
      }}
      variant="outlined"
    />
  );
};

export default NameField;
