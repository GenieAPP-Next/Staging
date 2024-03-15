import React from "react";
import { Gift } from "./type";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import dayjs from "dayjs";

interface GiftItemLogisticsProps {
  gift: Gift["Gift"];
  eventDate: string;
}

const GiftItemLogistics: React.FC<GiftItemLogisticsProps> = ({
  gift,
  eventDate,
}) => {
  const formattedEventDate = eventDate
    ? dayjs(eventDate).format("DD/MM/YYYY")
    : "";
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "0 0 20px 20px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6">{gift.name}</Typography>
            <Typography sx={{ fontWeight: "700" }} variant="h5" color="primary">
              Rp {parseInt(gift.price).toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="body1"> {formattedEventDate} </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GiftItemLogistics;
