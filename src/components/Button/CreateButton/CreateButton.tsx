import React from "react";
import Button from "@mui/material/Button";

interface CreateButtonProps {
  onCreate: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const CreateButton: React.FC<CreateButtonProps> = ({
  onCreate,
  fullWidth,
  disabled,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onCreate}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{ textTransform: "none", borderRadius: "14px" }}
    >
      Create
    </Button>
  );
};
