<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/no-misused-promises */
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d
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
import { AddGift } from "@/components/AddGift/type";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import axios from "axios";

interface RecommendationListProps {
  data: Array<{
<<<<<<< HEAD
    gift_id: string;
    name: string;
    price: number;
    image_url: string;
    username?: string;
=======
    urlLink: string;
    id: string;
    itemName: string;
    price: number;
    itemImage: string;
    creator: string;
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d
  }>;
}

export interface Item {
  gift_id: string;
  name: string;
  price: number;
<<<<<<< HEAD
  image_url: string;
  username?: string;
  url_link?: string;
=======
  itemImage: string;
  creator: string;
  isRecommendation: boolean;
  urlLink: string;
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d
}

const RecommendationList: React.FC<RecommendationListProps> = ({ data }) => {
  const theme = useTheme();
  const params = useParams<{ groupName: string }>();
  const [giftItemsLocal, setGiftItemsLocal] = useState<Item[]>([]);
  const [giftItems, setGiftItems] = useState<Item[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
<<<<<<< HEAD

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
=======
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d

  useEffect(() => {
    fetchRecommendedGift().catch((error) => {
      console.error("Failed to fetch recommended gifts:", error);
    });

    const storedItems: Item[] = JSON.parse(localStorage.getItem("giftItems") ?? "[]");
    setGiftItemsLocal(storedItems);
  }, []);

  const handleAdd = (id: string) => {
    const existingGiftItems: Item[] = JSON.parse(localStorage.getItem("giftItems") ?? "[]");

<<<<<<< HEAD
    const selectedItem = data.find((item) => item.gift_id === id);
    if (selectedItem && !existingGiftItems.some((item: Item) => item.gift_id === id)) {
      const updatedGifts: Item[] = [...existingGiftItems, selectedItem];
      setGiftItemsLocal(updatedGifts);
=======
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
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d
      localStorage.setItem("giftItems", JSON.stringify(updatedGifts));
    }
  };

<<<<<<< HEAD
  const handleAddNewGift = (gift: Item) => {
    const existingGiftItems: Item[] = JSON.parse(localStorage.getItem("giftItems") ?? "[]");

    const updatedGifts: Item[] = [...existingGiftItems, gift];
    setGiftItemsLocal(updatedGifts);
=======
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
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d
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
<<<<<<< HEAD
              gift_id={item.gift_id}
              name={item.name}
              price={item.price}
              image_url={item.image_url}
              onClick={() => {
                handleAdd(item.gift_id);
              }}
=======
              {...item}
              src={item.itemImage}
              onClick={() => {
                handleAdd(item.id);
              }} // Updated this line
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d
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
<<<<<<< HEAD
          {giftItemsLocal.map((item) => (
            <Box key={item.gift_id}>
=======
          {giftItems.map((item) => (
            <Box key={item.id}>
>>>>>>> 13c88391574a7c42e1875f1b970e608549aeaa2d
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
