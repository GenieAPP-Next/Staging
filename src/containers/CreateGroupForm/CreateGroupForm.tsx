"use client";
import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import NameField from "@/components/CreateGroup/NameField";
import CategoryDropdown from "@/components/CreateGroup/CategoryDropdown";
import DateField from "@/components/CreateGroup/DateField";
import dayjs from "dayjs";
// import MembersField from './MembersField';
// import CreateButton from './CreateButton';

const CreateGroupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate.format("YYYY-MM-DD"));
    }
  }, [selectedDate]);

  // const handleCreate = () => {
  //   // Handle the create action
  // };

  return (
    <Box sx={{ padding: "20px" }}>
      <Stack spacing={2}>
        <NameField name={name} onNameChange={setName} />
        <CategoryDropdown
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <DateField
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        {/* <MembersField />
        <CreateButton onCreate={handleCreate} /> */}
      </Stack>
    </Box>
  );
};

export default CreateGroupForm;
