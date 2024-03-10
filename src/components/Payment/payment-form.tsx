"use client";

import React, { useState, useEffect } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import classes from "./scss/payment-form.module.scss";

export default function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");
  const [toWho, setToWho] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  //   console.log(amount)

  useEffect(() => {
    const isFormFilled = amount && image && toWho;
    setIsSubmitDisabled(!isFormFilled);
  }, [amount, image, toWho]);

  const memberList = [{ name: "Ucup" }, { name: "Ucok" }];

  return (
    <form className={classes.formContainer}>
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
        <TextField
          id="image"
          label="Image"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <Autocomplete
          freeSolo
          id="to-who"
          disableClearable
          options={memberList.map((option) => option.name)}
          value={toWho}
          onChange={(_, newValue) => {
            setToWho(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="To"
              InputProps={{
                ...params.InputProps,
                type: "text",
              }}
            />
          )}
        />
      </div>
      <div className={classes.btnContainer}>
        <button disabled={isSubmitDisabled} style={{ backgroundColor: isSubmitDisabled ? "rgba(29, 27, 32, 0.12)" : "#4285f4", cursor: isSubmitDisabled ? "not-allowed" : "pointer" }}>
          Submit
        </button>
      </div>
    </form>
  );
}
