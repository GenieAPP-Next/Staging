"use client";
import { useState } from "react";
import AddMemberLogistics from "./add-member-logistics";
import MemberSearchInput from "./search-input";
import SubmitAddedMembers from "./submit-added-members";
import classes from "./scss/add-member.module.scss";
import { Member } from "./add-member-interface";

interface Props {
  memberList: Member[];
}

export default function AddMember({ memberList }: Props) {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  console.log(selectedMembers);

  const handleSelectMember = (memberName: string) => {
    const member = memberList.find((m) => m.name === memberName);
    if (member && !selectedMembers.find((m) => m.name === member.name)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleDeleteMember = (memberName: string) => {
    setSelectedMembers(selectedMembers.filter(member => member.name !== memberName));
  };

  return (
    <section id="add-members">
      <div className={classes.container}>
        <div className={classes.content} style={{ gap: selectedMembers.length > 0 ? "2rem" : "0rem" }}>
          <MemberSearchInput memberList={memberList} onSelectMember={handleSelectMember} />
          <div className={classes.wrapper}>
            <AddMemberLogistics selectedMembers={selectedMembers} onDeleteMember={handleDeleteMember} />
          </div>
        </div>
        <SubmitAddedMembers />
      </div>
    </section>
  );
}
