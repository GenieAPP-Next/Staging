import React from "react";
import Image from "next/image";
import { CardContent, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

export interface RecommendationCardProps {
  id: string;
  itemName: string;
  price: number;
  src: string;
  onClick?: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  id,
  itemName,
  price,
  src,
  onClick,
}) => {
  const theme = useTheme();
  const formattedPrice = price.toLocaleString("id-ID");

  return (
    <CardContent
      key={id}
      sx={{
        width: 137,
        height: 184,
        borderRadius: 3,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
        backgroundColor: "white",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 114,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        }}
      >
        {/* add alternate image if there are no image or still fetching image data */}
        <Image
          src={src}
          alt={`image for ${itemName}`}
          layout="cover"
          width={135}
          height={90}
          objectFit="cover"
          style={{ borderRadius: "12px 12px 0 0" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "23px 10px 0 10px",
        }}
      >
        <div style={{ flex: 1 }}>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontSize: 12,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {itemName}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {`Rp ${formattedPrice}`}
          </Typography>
        </div>
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: 40,
            height: 40,
          }}
          aria-label="add"
          onClick={() => {
            onClick && onClick(id);
          }}
        >
          <AddIcon sx={{ color: theme.palette.common.white }} />
        </IconButton>
      </Box>
    </CardContent>
  );
};

export default RecommendationCard;
