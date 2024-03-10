"use client";

import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface ModalProps {
  open: boolean;
  content?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, content, onClose }) => {
  const theme = useTheme();
  const handleInvite = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        PaperProps={{ sx: { minWidth: 312, minHeight: 180, borderRadius: "25px" } }}
        open={open}
        onClose={onClose}
      >
        <DialogTitle sx={{ fontSize: 24, fontWeight: 400, color: theme.palette.text.secondary }}>Invite</DialogTitle>
        <DialogContent sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ fontSize: 30, fontWeight: 500, letterSpacing: "5px", color: theme.palette.primary.main }}>
            {content}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant='outlined' color='primary' sx={{ borderRadius: 12, textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleInvite}
            variant='contained'
            color='primary'
            sx={{ borderRadius: 12, textTransform: "none" }}
            autoFocus
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
