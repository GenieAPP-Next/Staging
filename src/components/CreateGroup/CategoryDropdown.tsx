"use client";
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { CategoryDropdownProps } from "./type";

const categories = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Baby Shower",
  "Others",
];

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const handleCategoryChange = (event: SelectChangeEvent) => {
    onSelectCategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="Category"
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
