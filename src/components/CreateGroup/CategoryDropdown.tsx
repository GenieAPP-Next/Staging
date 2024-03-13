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
      <InputLabel
        id="category-select-label"
        sx={{
          transform: "translate(10px, 10px) scale(1)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(10px, -6px) scale(0.75)",
          },
        }}
      >
        Category
      </InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="Category"
        size="small"
        onChange={handleCategoryChange}
        sx={{
          ".MuiSelect-select": {
            paddingTop: "10px",
            paddingBottom: "10px",
          },
          "&& fieldset": {
            top: 0,
          },
        }}
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
