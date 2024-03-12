import Image from "next/image";
import { CardContent, Typography, Box } from "@mui/material";
import { CardProps } from "../RecommendationCard/RecommendationCard";
import { useTheme } from "@mui/material/styles";

const ListCard: React.FC<CardProps> = ({ gift_id, name, price, image_url, username }) => {
  const theme = useTheme();
  const formattedPrice = price.toLocaleString("id-ID");
  return (
    <>
      <CardContent
        key={gift_id}
        sx={{
          width: 328,
          height: 80,
          borderRadius: 3,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px !important",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ flex: 1, paddingLeft: 2 }}>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontSize: 12,
              fontWeight: 500,
              overflow: "hidden",
            }}
          >
            {name}
          </Typography>
          <Typography sx={{ color: theme.palette.primary.main, fontSize: 20, fontWeight: 500 }}>
            {`Rp ${formattedPrice}`}
          </Typography>
          <Typography
            sx={{
              color: "#79767D",
              fontSize: 10,
              fontWeight: 500,
              overflow: "hidden",
            }}
          >
            Added by {username}
          </Typography>
        </Box>
        <Box sx={{ flex: "none" }}>
          <Image
            src={image_url}
            alt={`image for ${name}`}
            layout='fixed'
            width={136}
            height={80}
            objectFit='cover'
            style={{ borderRadius: "12px 12px 0 0" }}
          />
        </Box>
      </CardContent>
    </>
  );
};

export default ListCard;
