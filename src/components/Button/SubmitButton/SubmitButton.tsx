import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

export interface ButtonComponentProps extends ButtonProps {
  children: ReactNode;
}

const SubmitButton = ({ onClick, children, ...rest }: ButtonComponentProps) => {
  return (
    <Button
      variant='contained'
      color='primary'
      sx={{
        width: "312px",
        height: "40px",
        borderRadius: "15px",
        textTransform: "none",
      }}
      onClick={onClick}
      {...rest}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{children}</Typography>
    </Button>
  );
};

export default SubmitButton;
