"use client";
import React, { useState } from "react";
import styles from "./giftItem.module.scss";
import { Card, Checkbox, Typography, CardMedia, Box } from "@mui/material";

interface GiftItemProps {
  name: string;
  price: string;
  votes: number;
  imageUrl: string;
  onVote: () => void;
  disabled: boolean;
}

const GiftItem: React.FC<GiftItemProps> = ({
  name,
  price,
  votes,
  imageUrl,
  onVote,
  disabled,
}) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setVoteCount(voteCount + 1);
      setHasVoted(true);
      onVote();
    }
  };

  return (
    <Card className={styles.item}>
      <CardMedia
        sx={{ width: "100px" }}
        component="img"
        height="100"
        image={imageUrl}
        alt={name}
      />
      <Box className={styles.details}>
        <Box sx={{ width: "150px" }}>
          <Typography
            variant="subtitle1"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "#4285F4",
            }}
          >
            {price}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body2">{voteCount} Votes</Typography>
        <Checkbox
          checked={hasVoted}
          onChange={handleVoteChange}
          disabled={disabled || hasVoted}
        />
      </Box>
    </Card>
  );
};

export default GiftItem;
