/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useState } from "react";
import GiftItem from "@/components/Voting/GiftItem";
import { Box, Button, List, Typography } from "@mui/material";
// import axios from "axios";

const giftsData = [
  {
    giftId: 1,
    name: "Nike Air Max 1",
    price: "Rp1.900.000",
    votes: 0,
    imageUrl: "/img/nk.jpg",
  },
  {
    giftId: 2,
    name: "Daniel Wellington Watch",
    price: "Rp2.345.000",
    votes: 1,
    imageUrl: "/img/dw.png",
  },
  {
    giftId: 3,
    name: "Calvin Klein Handbag",
    price: "Rp4.500.000",
    votes: 0,
    imageUrl: "/img/ck.webp",
  },
];

const Voting: React.FC = () => {
  const [votedItemId, setVotedItemId] = useState<number | null>(null);

  const handleVote = (giftId: number) => {
    setVotedItemId(giftId);
  };

  // const handleVote = async (giftId: number) => {
  //   const groupId = 31; // Replace with actual groupId
  //   const userId = 2; // Replace with actual userId

  //   try {
  //     const response = await axios.post("/api/voteGift", {
  //       groupId,
  //       giftId,
  //       userId,
  //     });

  //     // Handle the response as needed
  //     console.log(response.data);

  //     // Update the voted item state
  //     setVotedItemId(giftId);
  //   } catch (error) {
  //     console.error("Error in vote submission:", error);
  //   }
  // };

  return (
    <main>
      <Box
        sx={{
          height: "93.5vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List>
          {giftsData.map((gift) => (
            <GiftItem
              key={gift.giftId}
              name={gift.name}
              price={gift.price}
              votes={gift.votes}
              imageUrl={gift.imageUrl}
              onVote={() => {
                handleVote(gift.giftId);
              }}
              disabled={votedItemId !== null && votedItemId !== gift.giftId}
            />
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ padding: "16px 0", fontSize: "12px" }}
            variant="body2"
          >
            All member groups must vote before proceeding with the split bill.
          </Typography>
          <Button variant="contained" fullWidth sx={{ borderRadius: "50px" }}>
            Split Bill
          </Button>
        </Box>
      </Box>
    </main>
  );
};

export default Voting;
