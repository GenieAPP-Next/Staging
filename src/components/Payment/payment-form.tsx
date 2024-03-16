/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import classes from "./scss/payment-form.module.scss";

export default function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccessInfo, setPaymentSuccessInfo] = useState({
    billSplitId: "",
    amount: "",
    username: "",
  });

  useEffect(() => {
    setIsSubmitDisabled(!amount);
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = localStorage.getItem("user_id");
    const billSplitId = localStorage.getItem("bill_split_id");
    const username = localStorage.getItem("username");

    if (!userId || !billSplitId || !username) {
      console.error("Missing information from localStorage");
      return;
    }

    const payload = {
      billSplitId: parseInt(billSplitId, 10),
      payment_date: new Date().toISOString().split("T")[0],
      amount: parseFloat(amount),
      paymentMethod: "Credit Card",
      confirmationStatus: "Pending",
    };

    console.log("Payload being sent:", payload);

    try {
      await axios.post("/api/createPayment", payload);
      setPaymentSuccessInfo({ billSplitId, amount, username });
      setShowModal(true); // modal
    } catch (error) {
      console.error("Error in creating payment:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <div className={classes.inputField}>
          <TextField
            id="amount"
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className={classes.btnContainer}>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              backgroundColor: isSubmitDisabled
                ? "rgba(29, 27, 32, 0.12)"
                : "#4285f4",
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="payment-success-modal"
        aria-describedby="shows-payment-success-information"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            borderRadius: "20px",
          }}
        >
          <h2 id="payment-success-modal">Payment Successful</h2>
          <p>Username: {paymentSuccessInfo.username}</p>
          <p>Bill Split ID: {paymentSuccessInfo.billSplitId}</p>
          <p>Amount: {paymentSuccessInfo.amount}</p>
          <button onClick={handleCloseModal}>Close</button>
        </Box>
      </Modal>
    </>
  );
}
