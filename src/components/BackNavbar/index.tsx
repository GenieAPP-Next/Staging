import { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import { Modal } from "@/components";

interface BackNavbarProps {
  title: string;
}

const BackNavbar: FC<BackNavbarProps> = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const content = "2K23";

  return (
    <>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='back'>
            <ArrowBackIcon />
          </IconButton>
          <Typography component='div' sx={{ flexGrow: 1, fontSize: 22, fontWeight: 400 }}>
            {title}
          </Typography>
          <IconButton color='inherit' aria-label='share' onClick={handleShareClick}>
            <ShareIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal open={isModalOpen} onClose={handleCloseModal} content={content} />
    </>
  );
};

export default BackNavbar;
