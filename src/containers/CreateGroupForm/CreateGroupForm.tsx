/* eslint-disable @typescript-eslint/no-misused-promises */
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
import axios from "axios";

const CreateGroupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedBillPayerId, setSelectedBillPayerId] = useState<string | null>(
    null
  );

  const dummyMembers = [
    { id: "7", name: "Alice Wonderland" },
    { id: "2", name: "Bob" },
    // { id: "3", name: "Charlie" },
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

  const handleCreate = async () => {
    const userId = "7"; // get from user session
    const formattedDate = selectedDate
      ? selectedDate.format("YYYY-MM-DD")
      : null;

    const groupData = {
      name,
      category: selectedCategory,
      eventDate: formattedDate,
      creatorUserId: userId,
    };

    console.log("Creating group with data:", groupData);

    try {
      // Start creating group
      const createGroupResponse = await axios.post(
        "/api/createGroup",
        groupData
      );

      const groupId =
        createGroupResponse.data.data.newGroup.data.NewGroup.group_id;

      console.log("Group created, groupId:", groupId);

      // Ensure groupId is available
      if (!groupId) {
        console.error("Error: Group ID is undefined or null.");
        return;
      }

      // Add members to group with appropriate roles
      for (const member of memberList) {
        // Determine if the current member is the bill payer
        const role = member.id === selectedBillPayerId ? "billPayer" : "member";

        console.log(
          `Adding member ${member.id} to group ${groupId} with role ${role}`
        );
        const addMemberResponse = await axios.post("/api/addMember", {
          groupId,
          userId: member.id,
          role,
        });
        console.log(
          `Member ${member.id} added with role ${role}, response:`,
          addMemberResponse.data
        );
      }

      // Optional: Navigate to the group page or update the UI after all members have been added
      // router.push(`/group/${groupId}`);
    } catch (error) {
      console.error("Error creating group or adding members:", error);
      // Display error in UI or handle error differently
    }
  };

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "93.5vh",
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
        <CreateButton onCreate={handleCreate} disabled={!isFormComplete} />
      </Box>
    </main>
  );
};

export default CreateGroupForm;
