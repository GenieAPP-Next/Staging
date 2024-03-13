import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import RecommendationList from "@/containers/RecommendationList/RecommendationList";
import { items } from "./items";

const AddGiftPage = () => {
  return (
    <>
      <Navbar pageTitle='Add Gift' />
      <main
        style={{
          height: "calc(100vh - 64px)",
        }}
      >
        <RecommendationList data={items} />
      </main>
    </>
  );
};

export default AddGiftPage;
