/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";
import { AddGift } from "./type";

interface AddGiftCardProps {
  onAddGift: (gift: AddGift) => any;
}

const AddGiftCard: React.FC<AddGiftCardProps> = ({ onAddGift }) => {
  const [formData, setFormData] = useState<AddGift>({
    id: "",
    itemName: "",
    price: "",
    itemImage: "",
    src: "",
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, "");
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? ` ${formattedValue}` : value,
    }));
  };

  const handleImageUpload = async () => {
    // console.log("File input ref:", fileInputRef.current);
    // console.log("Files:", fileInputRef.current?.files);

    // Check if a file is selected
    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];

      const formData = new FormData();
      formData.append("image", file);

      // console.log("Attempting to upload file:", file);

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        // console.log("Response from imgBB:", data);

        if (data.success && data.data?.url) {
          setUploadedImageUrl(data.data.url);
          setUploadedImageName(data.data.image.filename);
          setFormData((prevData) => ({
            ...prevData,
            itemImage: data.data.url,
          }));
        } else {
          console.error("Failed to retrieve image URL from imgBB response");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected for upload");
    }
  };

  const handleAdd = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const newGift: AddGift = { ...formData, id };
    onAddGift(newGift);
    setFormData({
      id: "",
      itemName: "",
      price: " ",
      itemImage: "",
      src: "",
    });
  };

  return (
    <Box sx={{ padding: "16px", textAlign: "center" }}>
      <TextField
        fullWidth
        label='Name'
        variant='outlined'
        name='itemName'
        value={formData.itemName}
        onChange={handleChange}
        sx={{
          marginBottom: "12px",
          width: "375px",
          marginX: "auto",
          fontcolor: "grey",
        }}
      />
      <TextField
        fullWidth
        label='Price'
        variant='outlined'
        name='price'
        type='text'
        value={formData.price}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      <TextField
        fullWidth
        label='Image'
        focused
        variant='outlined'
        name='itemImage'
        type='file'
        inputRef={fileInputRef}
        onChange={handleImageUpload}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      {/* {uploadedImageUrl && uploadedImageName && (
        <Typography>{uploadedImageName}</Typography>
      )} */}
      <TextField
        fullWidth
        label='Marketplace Link'
        variant='outlined'
        name='src'
        value={formData.src}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      <Box sx={{ textAlign: "center" }}>
        <SubmitButton
          variant='contained'
          color='primary'
          sx={{
            width: "375px",
            height: "40px",
            borderRadius: "15px",
            textTransform: "none",
            marginX: "auto",
          }}
          onClick={handleAdd}
        >
          Add
        </SubmitButton>
      </Box>
    </Box>
  );
};

export default AddGiftCard;
