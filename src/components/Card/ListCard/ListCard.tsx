import Link from "next/link";
import Image from "next/image";
import { CardContent, Typography, Box } from "@mui/material";
import { CardProps } from "../RecommendationCard/RecommendationCard";
import { useTheme } from "@mui/material/styles";
import style from "@/components/Card/ListCard/ListCard.module.css";

const ListCard: React.FC<CardProps> = ({ id, itemName, price, itemImage, creator, urlLink }) => {
  const theme = useTheme();
  const formattedPrice = price.toLocaleString("id-ID");

  if (!urlLink) {
    return null;
  }

  return (
    <Link href={urlLink} passHref legacyBehavior>
      <a className={style.customlink} target='_blank' rel='noopener noreferrer'>
        <CardContent
          key={id}
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
              {itemName}
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
              Added by {creator}
            </Typography>
          </Box>
          <Box sx={{ flex: "none" }}>
            <Image
              src={itemImage}
              alt={`image for ${itemName}`}
              layout='fixed'
              width={136}
              height={80}
              objectFit='cover'
              style={{ borderRadius: "12px 12px 0 0" }}
            />
          </Box>
        </CardContent>
      </a>
    </Link>
  );
};

export default ListCard;
