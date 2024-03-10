"use client";

import React, { useEffect, useState } from "react";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent";
import RecommendationCard from "@/components/Card/RecommendationCard/RecommendationCard";
import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import ListCard from "@/components/Card/ListCard/ListCard";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";

interface RecommendationListProps {
  data: Array<{
    id: string;
    itemName: string;
    price: number;
    itemImage: string;
  }>;
}

interface Item {
  id: string;
  itemName: string;
  price: number;
  itemImage: string;
  creator: string;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ data }) => {
  const theme = useTheme();
  const [giftItems, setGiftItems] = useState<Item[]>([]);

  useEffect(() => {
    const storedItems: Item[] = JSON.parse(localStorage.getItem("giftItems") ?? "[]");
    setGiftItems(storedItems);
  }, [giftItems]);

  const handleAdd = (id: string) => {
    const existingCartItems = JSON.parse(localStorage.getItem("giftItems") ?? "[]");

    if (!existingCartItems.some((item: Item) => item.id === id)) {
      const selectedItem = data.find((item) => item.id === id);
      if (selectedItem) {
        existingCartItems.push(selectedItem);
        localStorage.setItem("giftItems", JSON.stringify(existingCartItems));
      }
    }
  };

  // SECTIONNYA RESYA
  const handleAddNewGift = () => {
    console.log(giftItems);
  };

  const handleSubmit = () => {
    console.log(giftItems);
  };

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
        {data.map((item) => (
          <div key={item.id}>
            <RecommendationCard {...item} src={item.itemImage} onClick={handleAdd} />
          </div>
        ))}
      </SwiperComponent>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px 14px 16px" }}>
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
          onClick={handleAddNewGift}
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <Typography>Add Gift</Typography>
        </Button>
      </Box>
      <Divider sx={{ width: "calc(425px - 24px)", marginX: "auto", color: "#CAC4D0", marginBottom: "15px" }} />
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
          {giftItems.map((item) => (
            <Box key={item.id}>
              <ListCard
                id={item.id}
                itemName={item.itemName}
                price={item.price}
                src={item.itemImage}
                creator={item.creator}
              />
            </Box>
          ))}
        </Box>
        <SubmitButton onClick={handleSubmit} disabled={!giftItems.length}>
          Submit
        </SubmitButton>
      </Box>
    </>
  );
};

export default RecommendationList;
