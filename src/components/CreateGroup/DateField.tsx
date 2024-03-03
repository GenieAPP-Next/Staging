import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TextField } from "@mui/material";
import { DateFieldProps } from "./type";

dayjs.extend(customParseFormat);

const DateField: React.FC<DateFieldProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Event Date"
        value={selectedDate}
        onChange={onDateChange}
        format="YYYY-MM-DD"
        minDate={dayjs()}
        slots={{
          textField: (textFieldProps) => (
            <TextField
              {...textFieldProps}
              aria-label="Event Date"
              placeholder={!selectedDate ? "" : "YYYY/MM/DD/"}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default DateField;
