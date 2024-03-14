/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import React, { useEffect, useState } from "react";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent";
import RecommendationCard from "@/components/Card/RecommendationCard/RecommendationCard";
import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import ListCard from "@/components/Card/ListCard/ListCard";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AddGiftCard from "@/components/AddGift/AddGiftCard";
import { AddGift } from "@/components/AddGift/type";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";

interface RecommendationListProps {
  data: Array<{
    urlLink: string;
    id: string;
    itemName: string;
    price: number;
    itemImage: string;
    creator: string;
  }>;
}

interface Item {
  id: string;
  itemName: string;
  price: number;
  itemImage: string;
  creator: string;
  isRecommendation: boolean;
  urlLink: string;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ data }) => {
  const theme = useTheme();
  const [giftItems, setGiftItems] = useState<Item[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const storedItems: Item[] = JSON.parse(
      localStorage.getItem("giftItems") ?? "[]"
    );
    setGiftItems(storedItems);
  }, []);

  const handleAdd = (id: string) => {
    const existingCartItems: Item[] = JSON.parse(
      localStorage.getItem("giftItems") ?? "[]"
    );

    const selectedItem = data.find((item) => item.id === id);
    if (
      selectedItem &&
      !existingCartItems.some((item: Item) => item.id === id)
    ) {
      const updatedGifts: Item[] = [
        ...existingCartItems,
        {
          ...selectedItem,
          isRecommendation: true,
          urlLink: selectedItem.urlLink,
        }, // Menandai sebagai rekomendasi
      ];
      setGiftItems(updatedGifts);
      console.log("Added recommendation gift:", selectedItem);
      localStorage.setItem("giftItems", JSON.stringify(updatedGifts));
    }
  };

  const handleAddNewGift = (gift: AddGift) => {
    // Pastikan image telah diupload dan URL tersedia
    if (!gift.itemImage) {
      console.error("No image URL available for the gift");
      return; // Atau tampilkan pesan error kepada pengguna
    }

    const priceAsString = "123.45"; // This might come from an input field
    const priceAsNumber = parseFloat(priceAsString);

    const newGift: Item = {
      id: new Date().getTime().toString(), // ID unik untuk gift baru
      itemName: gift.itemName, // Nama gift
      price: priceAsNumber, // Harga gift
      itemImage: gift.itemImage, // URL gambar gift dari ImgBB
      creator: localStorage.getItem("user_id") ?? "Unknown", // User ID dari localStorage
      urlLink: gift.src, // Link marketplace
      isRecommendation: false, // Tandai sebagai bukan rekomendasi
    };

    console.log("Added new gift:", newGift);

    const updatedGifts = [...giftItems, newGift];
    setGiftItems(updatedGifts);
    localStorage.setItem("giftItems", JSON.stringify(updatedGifts));
    setDrawerOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const payload = giftItems.map((item) => ({
        groupId: 33, // ID grup hardcoded
        name: item.itemName,
        price: item.price,
        imageUrl: item.itemImage,
        urlLink: item.urlLink,
        userId: localStorage.getItem("user_id") ?? "Unknown", // User ID dari localStorage
        categoryId: 1, // ID kategori hardcoded
        isRecommendation: item.isRecommendation, // Menambahkan flag isRecommendation
        recommendedGroupId: item.isRecommendation ? 31 : undefined,
      }));

      console.log("Payload before submission:", payload);

      const response = await fetch("/api/addGift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ giftItems: payload }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit gifts");
      }

      const responseData = await response.json();
      console.log("Submit response:", responseData);
    } catch (error) {
      console.error("Error during gift submission:", error);
    }
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
            <RecommendationCard
              {...item}
              src={item.itemImage}
              onClick={() => {
                handleAdd(item.id);
              }} // Updated this line
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
          variant="text"
          color="primary"
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
      <SwipeableDrawer
        anchor="bottom"
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
