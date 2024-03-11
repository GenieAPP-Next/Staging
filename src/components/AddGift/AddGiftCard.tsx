import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";

interface AddGiftCardProps {
  onAddGift: (gift: AddGift) => any;
}

interface AddGift {
  id: string;
  itemName: string;
  price: string;
  itemImage: string;
  src: string;
}

const AddGiftCard: React.FC<AddGiftCardProps> = ({ onAddGift }) => {
  const [formData, setFormData] = useState<AddGift>({
    id: "",
    itemName: "",
    price: "",
    itemImage: "",
    src: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, "");
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? ` ${formattedValue}` : value,
    }));
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
        label="Name"
        variant="outlined"
        name="itemName"
        value={formData.itemName}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      <TextField
        fullWidth
        label="Price"
        variant="outlined"
        name="price"
        type="text"
        value={formData.price}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      <TextField
        fullWidth
        label="Image"
        variant="outlined"
        name="itemImage"
        value={formData.itemImage}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      <TextField
        fullWidth
        label="Marketplace Link"
        variant="outlined"
        name="src"
        value={formData.src}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      <Box sx={{ textAlign: "center" }}>
        <SubmitButton
          variant="contained"
          color="primary"
          sx={{
            width: "375px",
            height: "40px",
            borderRadius: "15px",
            textTransform: "none",
            marginX: "auto",
          }}
          onClick={handleAdd}>
          Add
        </SubmitButton>
      </Box>
    </Box>
  );
};

export default AddGiftCard;
