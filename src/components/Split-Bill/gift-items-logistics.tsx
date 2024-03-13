import React from "react";
import { GiftItem } from "./type";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface GiftItemLogisticsProps {
  gift: GiftItem;
}

const GiftItemLogistics: React.FC<GiftItemLogisticsProps> = ({ gift }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "0 0 20px 20px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <CardContent>
        <Typography variant="h6">{gift.name}</Typography>
        <Typography sx={{ fontWeight: "700" }} variant="h5" color="primary">
          Rp {parseInt(gift.price).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GiftItemLogistics;
