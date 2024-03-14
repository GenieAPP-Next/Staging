/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useEffect, useState } from "react";
import GiftItem from "@/components/Voting/GiftItem";
import {
  Box,
  Button,
  List,
  Typography,
  Snackbar,
  Alert,
  SnackbarCloseReason,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface Gift {
  gift_id: number;
  name: string;
  price: string;
  votes: number;
  image_url: string;
  user: number[];
  total_member: number;
}

const Voting: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [allMembersVoted, setAllMembersVoted] = useState(false);
  const [votedItemId, setVotedItemId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const groupId = localStorage.getItem("group_id");
    if (groupId) {
      const fetchGiftsData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/getVote/${groupId}`);
          if (
            response.data?.data &&
            Array.isArray(response.data.data.data.Gift)
          ) {
            const giftsFromResponse = response.data.data.data.Gift.map(
              (gift: Gift) => ({
                ...gift,
                votes: gift.user.length,
              })
            );

            setGifts(giftsFromResponse);

            const allUserIds = giftsFromResponse.flatMap(
              (gift: Gift) => gift.user
            );
            const uniqueUserIds = new Set(allUserIds);

            const allVoted =
              uniqueUserIds.size ===
              parseInt(giftsFromResponse[0]?.total_member, 10);
            setAllMembersVoted(allVoted);

            console.log("Unique User IDs Count:", uniqueUserIds.size);
            console.log("Total Member:", giftsFromResponse[0]?.total_member);
            console.log("All Members Voted:", allVoted);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching voting data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      void fetchGiftsData();
    }
  }, []);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAlertClose = () => {
    setSnackbarOpen(false);
  };

  const handleVote = async (giftId: number) => {
    const storedGroupId = localStorage.getItem("group_id");
    const storedUserId = localStorage.getItem("user_id");

    const groupId = storedGroupId ? parseInt(storedGroupId, 10) : null;
    const userId = storedUserId ? parseInt(storedUserId, 10) : null;

    if (!groupId || !userId) {
      console.error("Missing group ID or user ID from local storage.");
      setSnackbarMessage("Unable to retrieve group or user information.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Proceed with the vote submission
    try {
      const response = await axios.post("/api/voteGift", {
        groupId,
        giftId,
        userId,
      });

      console.log(response.data);
      setSnackbarMessage("Successfully voted for the gift!");
      setSnackbarSeverity("success");
      setVotedItemId(giftId);
    } catch (error: any) {
      console.error("Error in vote submission:", error);
      setSnackbarMessage(error.message || "An unexpected error occurred.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "93.5vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          {gifts.map((gift) => (
            <GiftItem
              key={gift.gift_id}
              name={gift.name}
              price={`Rp${parseFloat(gift.price).toLocaleString()}`}
              votes={gift.user?.length || 0}
              imageUrl={gift.image_url}
              onVote={() => {
                void handleVote(gift.gift_id);
              }}
              disabled={votedItemId !== null && votedItemId !== gift.gift_id}
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
          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: "14px" }}
            disabled={!allMembersVoted}
          >
            Split Bill
          </Button>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Voting;
