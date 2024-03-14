/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [allMembersVoted, setAllMembersVoted] = useState(false);
  const [votedItemId, setVotedItemId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const checkAllMembersVoted = (giftsFromResponse: Gift[]) => {
    const allUserIds = giftsFromResponse.flatMap((gift) => gift.user);
    const uniqueUserIds = new Set(allUserIds);
    // Convert the total_member to a string before passing it to parseInt
    const totalMember = giftsFromResponse[0]?.total_member.toString();
    return uniqueUserIds.size === parseInt(totalMember, 10);
  };

  const fetchAndProcessGifts = async (groupId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/getVote/${groupId}`);
      if (response.data?.data && Array.isArray(response.data.data.data.Gift)) {
        const giftsFromResponse = response.data.data.data.Gift.map(
          (gift: Gift) => ({
            ...gift,
            votes: gift.user.length,
          })
        );
        setGifts(giftsFromResponse);
        setAllMembersVoted(checkAllMembersVoted(giftsFromResponse));
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching voting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const groupId = localStorage.getItem("group_id");
    if (groupId) {
      void fetchAndProcessGifts(groupId);
    }
  }, []);

  const handleVote = async (giftId: number) => {
    const groupId = localStorage.getItem("group_id");
    const userId = localStorage.getItem("user_id");

    if (!groupId || !userId) {
      setSnackbarMessage("Missing group or user ID information.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post("/api/voteGift", {
        groupId,
        giftId,
        userId,
      });
      setVotedItemId(giftId);
      setSnackbarMessage("Successfully voted for the gift!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      await fetchAndProcessGifts(groupId); // Refresh data and check voting status
    } catch (error: any) {
      console.error("Error in vote submission:", error);
      setSnackbarMessage(error.message || "An unexpected error occurred.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

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

  const handleSplitBill = async () => {
    const groupId = localStorage.getItem("group_id");
    const groupName = localStorage.getItem("createGroupName"); // group name from localStorage

    if (!groupId || !groupName || gifts.length === 0) {
      console.error("Missing group ID, group name, or no gifts available.");
      return;
    }

    // Find the most voted gift
    const mostVotedGift = gifts.reduce((prev, current) => {
      return prev.votes > current.votes ? prev : current;
    });

    try {
      const response = await axios.post(
        `/api/splitBill/${groupId}/${mostVotedGift.gift_id}`
      );
      console.log("Split Bill Response:", response.data);

      // Navigate to split bill page
      router.push(`/${groupName}/split-bill`);
    } catch (error) {
      console.error("Error in Split Bill:", error);
      // Handle error - Show error message
    }
  };

  if (isLoading) {
    return (
      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "93.5vh",
            backgroundColor: "#fefefe",
          }}
        >
          <CircularProgress />
        </Box>
      </main>
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
            onClick={handleSplitBill}
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
