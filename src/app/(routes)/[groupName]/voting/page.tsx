import Navbar from "@/components/Navbar/Navbar";
import Voting from "@/containers/Voting/Voting";
import React from "react";

const VotingPage = () => {
  return (
    <>
      <Navbar pageTitle="Vote" />
      <Voting />
    </>
  );
};

export default VotingPage;
