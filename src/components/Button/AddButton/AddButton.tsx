"use client";
import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const AddButton = () => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push("/group/create");
  };

  return (
    <Fab color="primary" aria-label="add" onClick={handleAddClick}>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
