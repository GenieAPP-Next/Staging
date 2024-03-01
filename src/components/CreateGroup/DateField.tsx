import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface DateFieldProps {
  selectedDate: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
}

const DateField: React.FC<DateFieldProps> = ({ selectedDate, onDateChange }) => {
  const handleChange = (date: dayjs.Dayjs | null) => {
    onDateChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Event Date"
        value={selectedDate}
        onChange={handleChange}
        minDate={dayjs()}
      />
    </LocalizationProvider>
  );
};

export default DateField;
