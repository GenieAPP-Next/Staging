"use client";
import { Autocomplete, TextField } from "@mui/material";
import classes from "./scss/add-member.module.scss";
import { Member } from "./add-member-interface";

interface Props {
  memberList: Member[];
  onSelectMember: (memberName: string) => void;
}

export default function MemberSearchInput({ memberList, onSelectMember }: Props) {
  return (
    <div className={classes.searchLayout}>
      <Autocomplete
        onChange={(_, newValue) => {
          if (newValue) onSelectMember(newValue);
        }}
        className={classes.searchContainer}
        freeSolo
        id="add-member-search"
        disableClearable
        options={memberList.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </div>
  );
}
