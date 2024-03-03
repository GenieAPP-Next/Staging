import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface ButtonComponentProps {
  onClick: () => void;
  children: string;
}

const ButtonSubmit = ({ onClick, children }: ButtonComponentProps) => {
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
    >
      <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{children}</Typography>
    </Button>
  );
};

export default ButtonSubmit;
