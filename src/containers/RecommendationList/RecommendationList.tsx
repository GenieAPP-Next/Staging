"use client";

import React from "react";
import SwiperComponent from "@/components/SwiperComponent/SwiperComponent";
import RecommendationCard from "@/components/Card/RecommendationCard/RecommendationCard";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
}

const RecommendationList: React.FC<RecommendationListProps> = ({ data }) => {
  const theme = useTheme();

  const handleAdd = (id: string) => {
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]");

    if (!existingCartItems.some((item: Item) => item.id === id)) {
      const selectedItem = data.find((item) => item.id === id);
      if (selectedItem) {
        existingCartItems.push(selectedItem);
        localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
      }
    }
  };

  return (
    <>
      <Typography
        sx={{
          color: theme.palette.text.primary,
          fontSize: 16,
          fontWeight: 500,
          padding: "19px 0 11px 20px",
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
    </>
  );
};

export default RecommendationList;
