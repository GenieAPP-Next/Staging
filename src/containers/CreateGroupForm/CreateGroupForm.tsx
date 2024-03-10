/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useState, useEffect } from "react";
import { Box, Stack, Snackbar, Alert, LinearProgress } from "@mui/material";
import NameField from "@/components/CreateGroup/NameField";
import CategoryDropdown from "@/components/CreateGroup/CategoryDropdown";
import DateField from "@/components/CreateGroup/DateField";
import dayjs from "dayjs";
import { MemberList } from "@/components/CreateGroup/MemberList";
import AddMemberButton from "@/components/CreateGroup/AddMemberButton";
import { CreateButton } from "@/components/Button/CreateButton/CreateButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Member } from "@/components/CreateGroup/type";

const CreateGroupForm: React.FC = () => {
  const [name, setName] = useState(
    () => localStorage.getItem("createGroupName") ?? ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    () => localStorage.getItem("createGroupCategory") ?? ""
  );
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(() => {
    const storedDate = localStorage.getItem("createGroupDate");
    return storedDate ? dayjs(storedDate) : null;
  });
  const [selectedBillPayerId, setSelectedBillPayerId] = useState<string | null>(
    null
  );
  const [isBillPayerSelected, setIsBillPayerSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("createGroupName", name);
    localStorage.setItem("createGroupCategory", selectedCategory);
    if (selectedDate) {
      localStorage.setItem("createGroupDate", selectedDate.toISOString());
    }
  }, [name, selectedCategory, selectedDate]);

  useEffect(() => {
    const storedMembers = localStorage.getItem("addedMembers");
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  const isFormComplete =
    name !== "" &&
    selectedCategory !== "" &&
    selectedDate !== null &&
    members.length > 0 &&
    selectedBillPayerId !== null;

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleSelectBillPayer = (id: string) => {
    setSelectedBillPayerId(id);
    setIsBillPayerSelected(true);
  };

  const handleCreate = async () => {
    if (!isBillPayerSelected) {
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("Error: No userId found in localStorage.");
      setIsLoading(false);
      setSnackbarOpen(true);
      return;
    }
    const formattedDate = selectedDate
      ? selectedDate.format("YYYY-MM-DD")
      : null;

    const groupData = {
      name,
      category: selectedCategory,
      eventDate: formattedDate,
      creatorUserId: userId,
    };

    try {
      const createGroupResponse = await axios.post(
        "/api/createGroup",
        groupData
      );
      const groupId =
        createGroupResponse.data.data.newGroup.data.NewGroup.group_id;

      if (!groupId) {
        console.error("Error: Group ID is undefined or null.");
        setIsLoading(false);
        return;
      }

      for (const member of members) {
        const role =
          member.user_id === selectedBillPayerId ? "billPayer" : "member";
        await axios.post("/api/addMember", {
          groupId,
          userId: member.user_id,
          role,
        });
      }

      localStorage.removeItem("createGroupName");
      localStorage.removeItem("createGroupCategory");
      localStorage.removeItem("createGroupDate");
      localStorage.removeItem("addedMembers");

      setSuccessSnackbarOpen(true);
      setTimeout(() => {
        router.push(`/${name}/gift`);
      }, 1500);
    } catch (error) {
      console.error("Error creating group or adding members:", error);
    } finally {
      setIsLoading(false);
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
        {isLoading && (
          <Box sx={{ width: "100%", my: 2 }}>
            <LinearProgress />
          </Box>
        )}
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
          <AddMemberButton
            onAddMember={() => router.push("/group/add-member")}
          />
          <MemberList
            members={members}
            selectedBillPayerId={selectedBillPayerId}
            onSelectBillPayer={handleSelectBillPayer}
          />
        </Stack>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please select a bill payer.
          </Alert>
        </Snackbar>

        <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSuccessSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSuccessSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Group created successfully!
          </Alert>
        </Snackbar>

        <CreateButton onCreate={handleCreate} disabled={!isFormComplete} />
      </Box>
    </main>
  );
};

export default CreateGroupForm;
