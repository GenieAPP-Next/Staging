"use client";
import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import NameField from "@/components/CreateGroup/NameField";
import CategoryDropdown from "@/components/CreateGroup/CategoryDropdown";
import DateField from "@/components/CreateGroup/DateField";
import dayjs from "dayjs";
import { MemberList } from "@/components/CreateGroup/MemberList";
import AddMember from "@/components/CreateGroup/AddMember";
import { CreateButton } from "@/components/Button/CreateButton/CreateButton";
import { useRouter } from "next/navigation";

const CreateGroupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedBillPayerId, setSelectedBillPayerId] = useState<string | null>(
    null
  );

  const dummyMembers = [
    { id: "1", name: "Alice Wonderland" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
    //  dummy data
  ];

  const [memberList] = useState(dummyMembers);

  const isFormComplete =
    name !== "" &&
    selectedCategory !== "" &&
    selectedDate !== null &&
    memberList.length > 0;

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate.format("YYYY-MM-DD"));
    }
  }, [selectedDate]);

  const router = useRouter();

  const handleAddMember = () => {
    router.push("/group/add-member");
  };
  const handleSelectBillPayer = (id: string) => {
    setSelectedBillPayerId(id);
  };

  const handleCreate = () => {
    // Logic to create a group
    const userId = "someUserId";
    const formattedDate = selectedDate
      ? selectedDate.format("YYYY-MM-DD")
      : null;
    console.log("Create group with:", {
      name,
      selectedCategory,
      selectedDate: formattedDate,
      memberList,
      billPayerId: selectedBillPayerId,
      createdBy: userId,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        padding: "20px",
      }}
    >
      <Stack spacing={2} sx={{ mb: "auto" }}>
        <NameField name={name} onNameChange={setName} />
        <CategoryDropdown
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <DateField
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <AddMember onAddMember={handleAddMember} />
        <MemberList
          members={memberList}
          selectedBillPayerId={selectedBillPayerId}
          onSelectBillPayer={handleSelectBillPayer}
        />
      </Stack>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          p: "20px",
          bgcolor: "background.paper",
        }}
      >
        <CreateButton
          onCreate={handleCreate}
          disabled={!isFormComplete}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default CreateGroupForm;
