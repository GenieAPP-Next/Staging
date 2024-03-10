import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import RecommendationList from "@/containers/RecommendationList/RecommendationList";
import { items } from "./items";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";

const AddGiftPage = () => {
  return (
    <>
      <Navbar pageTitle='Add Gift' />
      <main
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <RecommendationList data={items} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <SubmitButton disabled>Submit</SubmitButton>
        </div>
      </main>
    </>
  );
};

export default AddGiftPage;
