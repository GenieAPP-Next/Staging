"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent";
import RecommendationCard from "@/components/Card/RecommendationCard/RecommendationCard";
import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import ListCard from "@/components/Card/ListCard/ListCard";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AddGiftCard from "@/components/AddGift/AddGiftCard";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import axios from "axios";

interface RecommendationListProps {
  data: Array<{
    gift_id: string;
    name: string;
    price: number;
    image_url: string;
    username?: string;
  }>;
}

export interface Item {
  gift_id: string;
  name: string;
  price: number;
  image_url: string;
  username?: string;
  url_link?: string;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ data }) => {
  const theme = useTheme();
  const params = useParams<{ groupName: string }>();
  const [giftItemsLocal, setGiftItemsLocal] = useState<Item[]>([]);
  const [giftItems, setGiftItems] = useState<Item[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchRecommendedGift = async () => {
    try {
      const response = await axios.get(`/api/recommendation/${params.groupName}`);
      console.log(response);
      const recommendedGift: Item[] = response.data.data;
      setGiftItems(recommendedGift);
    } catch (error: any) {
      alert("Error fetching recommended gifts:" + error);
    }
  };

  useEffect(() => {
    fetchRecommendedGift().catch((error) => {
      console.error("Failed to fetch recommended gifts:", error);
    });

    const storedItems: Item[] = JSON.parse(localStorage.getItem("giftItems") ?? "[]");
    setGiftItemsLocal(storedItems);
  }, []);

  const handleAdd = (id: string) => {
    const existingGiftItems: Item[] = JSON.parse(localStorage.getItem("giftItems") ?? "[]");

    const selectedItem = data.find((item) => item.gift_id === id);
    if (selectedItem && !existingGiftItems.some((item: Item) => item.gift_id === id)) {
      const updatedGifts: Item[] = [...existingGiftItems, selectedItem];
      setGiftItemsLocal(updatedGifts);
      localStorage.setItem("giftItems", JSON.stringify(updatedGifts));
    }
  };

  const handleAddNewGift = (gift: Item) => {
    const existingGiftItems: Item[] = JSON.parse(localStorage.getItem("giftItems") ?? "[]");

    const updatedGifts: Item[] = [...existingGiftItems, gift];
    setGiftItemsLocal(updatedGifts);
    localStorage.setItem("giftItems", JSON.stringify(updatedGifts));
    setDrawerOpen(false);
  };

  const handleSubmit = () => {
    console.log(giftItems);
  };

  console.log(giftItems);

  return (
    <>
      <Typography
        sx={{
          color: theme.palette.text.primary,
          fontSize: 16,
          fontWeight: 500,
          padding: "20px 0 10px 20px",
        }}
      >
        Recommendation
      </Typography>
      <SwiperComponent>
        {giftItems.map((item) => (
          <div key={item.gift_id}>
            <RecommendationCard
              gift_id={item.gift_id}
              name={item.name}
              price={item.price}
              image_url={item.image_url}
              onClick={() => {
                handleAdd(item.gift_id);
              }}
            />
          </div>
        ))}
      </SwiperComponent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px 14px 16px",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Your Gift
        </Typography>
        <Button
          variant='text'
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => {
            setDrawerOpen(true);
          }}
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <Typography>Add Gift</Typography>
        </Button>
      </Box>
      <Divider
        sx={{
          width: "calc(425px - 24px)",
          marginX: "auto",
          color: "#CAC4D0",
          marginBottom: "15px",
        }}
      />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "400px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "15px",
          }}
        >
          {giftItemsLocal.map((item) => (
            <Box key={item.gift_id}>
              <ListCard
                gift_id={item.gift_id}
                name={item.name}
                price={item.price}
                image_url={item.image_url}
                username={item.username}
              />
            </Box>
          ))}
        </Box>
        <SubmitButton onClick={handleSubmit} disabled={!giftItems.length}>
          Submit
        </SubmitButton>
      </Box>
      <SwipeableDrawer
        anchor='bottom'
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        onOpen={() => {
          setDrawerOpen(true);
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: "425px",
            borderRadius: "25px 25px 0 0",
            margin: "auto",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <HorizontalRuleRoundedIcon sx={{ fontSize: "large" }} />
        </Box>
        <AddGiftCard onAddGift={handleAddNewGift} />
      </SwipeableDrawer>
    </>
  );
};

export default RecommendationList;
