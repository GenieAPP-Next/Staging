"use client";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import classes from "./scss/add-member.module.scss";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/helper-converter";

interface Props {
  onSelectMember: (inputValue: string) => void;
  isLoading: boolean;
  errorMessage: string;
  clearError: () => void;
}

export default function MemberSearchInput({ onSelectMember, isLoading, errorMessage, clearError }: Props) {
  const [inputValue, setInputValue] = useState("");

  const debouncedOnSelectMember = useCallback(
    debounce((value: string) => {
      onSelectMember(value);
    }, 1000), // 1000ms delay
    []
  );

  useEffect(() => {
    if (inputValue) {
      debouncedOnSelectMember(inputValue);
    } else {
      clearError();
    }

    return () => {
      debouncedOnSelectMember.cancel();
    };
  }, [inputValue, debouncedOnSelectMember]);

  const options: [] = [];

  return (
    <div className={classes.searchLayout}>
      <Autocomplete
        className={classes.searchContainer}
        freeSolo
        options={options}
        onInputChange={(_, newValue) => {
          setInputValue(newValue);
          if (!newValue) {
            clearError();
          }
        }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            error={!!errorMessage}
            helperText={capitalizeFirstLetter(errorMessage)}
            label="Search..."
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        loading={isLoading}
        loadingText="Loading..."
      />
    </div>
  );
}
