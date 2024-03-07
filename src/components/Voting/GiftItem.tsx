import React from "react";
import styles from "./giftItem.module.scss";
import { Card, Checkbox, Typography, CardMedia } from "@mui/material";

interface GiftItemProps {
  name: string;
  price: string;
  votes: number;
  checked: boolean;
  imageUrl: string;
}

const GiftItem: React.FC<GiftItemProps> = ({
  name,
  price,
  votes,
  checked,
  imageUrl,
}) => {
  return (
    <Card className={styles.item}>
      <CardMedia component="img" height="140" image={imageUrl} alt={name} />
      <div className={styles.details}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="body2">{price}</Typography>
        <Typography variant="body2">{votes} Votes</Typography>
        <Checkbox checked={checked} />
      </div>
    </Card>
  );
};

export default GiftItem;
