import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddMemberProps } from "./type";

const AddMember: React.FC<AddMemberProps> = ({ onAddMember }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      sx={{
        borderBottom: "1px solid grey",
        padding: "8px",
      }}
    >
      <Typography variant="h6">Members</Typography>
      <Button
        color="primary"
        endIcon={<AddIcon />}
        onClick={onAddMember}
        style={{ textTransform: "none" }}
      >
        Add Members
      </Button>
    </Stack>
  );
};

export default AddMember;
