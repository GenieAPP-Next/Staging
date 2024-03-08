import theme from "@/theme/theme";
import Typography from "@mui/material/Typography";

interface ValidationTextProps {
  errors: string;
}

const ValidationText: React.FC<ValidationTextProps> = ({ errors }) => {
  return (
    <Typography variant='body2' sx={{ color: theme.palette.error.main, padding: "5px", fontStyle: "italic" }}>
      {errors}
    </Typography>
  );
};

export default ValidationText;
