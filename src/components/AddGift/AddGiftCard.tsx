import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SubmitButton from "@/components/Button/SubmitButton/SubmitButton";
import { Item } from "@/containers/RecommendationList/RecommendationList";

interface AddGiftCardProps {
  onAddGift: (gift: Item) => any;
}

const AddGiftCard: React.FC<AddGiftCardProps> = ({ onAddGift }) => {
  const [formData, setFormData] = useState<Item>({
    gift_id: "",
    name: "",
    price: 0,
    image_url: "",
    url_link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, "");
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(formattedValue) : value,
    }));
  };

  const handleAdd = () => {
    const gift_id = Math.random().toString(36).substr(2, 9);
    const newGift: Item = { ...formData, gift_id };
    onAddGift(newGift);
    setFormData({
      gift_id: "",
      name: "",
      price: 0,
      image_url: "",
      url_link: "",
    });
  };

  return (
    <Box sx={{ padding: "16px", textAlign: "center" }}>
      <TextField
        fullWidth
        label='Name'
        variant='outlined'
        name='name'
        value={formData.name}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
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
        variant='outlined'
        name='image_url'
        value={formData.image_url}
        onChange={handleChange}
        sx={{ marginBottom: "12px", width: "375px", marginX: "auto" }}
      />
      <TextField
        fullWidth
        label='Marketplace Link'
        variant='outlined'
        name='url_link'
        value={formData.url_link}
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
