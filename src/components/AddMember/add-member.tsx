"use client";
import { useCallback, useEffect, useState } from "react";
import AddMemberLogistics from "./add-member-logistics";
import MemberSearchInput from "./search-input";
import SubmitAddedMembers from "./submit-added-members";
import classes from "./scss/add-member.module.scss";
import { Member } from "./add-member-interface";
import { api } from "@/app/api/constant";

const getMemberByUsername = async (username: string) => {
  try {
    const response = await api.get(`/findMember/${username}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function AddMember() {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(selectedMembers);

  const fetchSearchResults = useCallback(async (username: string) => {
    setLoading(true);
    try {
      const response = await getMemberByUsername(username);
      const memberData = response.data.data;
      console.log("consoledata", memberData);

      setSelectedMembers((currentMembers) => {
        const isMemberExists = currentMembers.some((member) => member.user_id === memberData.user_id);

        if (!isMemberExists && memberData) {
          clearErrorMessage();
          return [...currentMembers, memberData];
        }

        return currentMembers;
      });
    } catch (error: any) {
      console.error("Failed to fetch Member", error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectMember = (inputValue: string) => {
    void fetchSearchResults(inputValue);
  };

  const handleDeleteMember = (memberName: string) => {
    const updatedMembers = selectedMembers.filter((member) => member.username !== memberName);
    setSelectedMembers(updatedMembers);

    localStorage.setItem("addedMembers", JSON.stringify(updatedMembers));
  };

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    const storedMembers = localStorage.getItem("addedMembers");
    if (storedMembers) {
      setSelectedMembers(JSON.parse(storedMembers) as Member[]);
    }
  }, []);

  return (
    <section id="add-members">
      <div className={classes.container}>
        <div className={classes.content} style={{ gap: selectedMembers.length > 0 ? "2rem" : "0rem" }}>
          <MemberSearchInput onSelectMember={handleSelectMember} isLoading={loading} errorMessage={errorMessage} clearError={clearErrorMessage} />
          <div className={classes.wrapper}>
            <AddMemberLogistics selectedMembers={selectedMembers} onDeleteMember={handleDeleteMember} />
          </div>
        </div>
        <SubmitAddedMembers addedMembers={selectedMembers} />
      </div>
    </section>
  );
}
