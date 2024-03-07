import Navbar from "@/components/Navbar/Navbar";
import GiftList from "@/components/Voting/GiftList";
import React from "react";

const VotingPage = () => {
  return (
    <>
      <Navbar pageTitle="Voting" />
      <GiftList />
    </>
  );
};

export default VotingPage;
