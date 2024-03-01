"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#4b4b4b"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      minDate={new Date()}
      showDateDisplay={false}
      direction="horizontal"
      disabledDates={disabledDates}
    />
  );
};

export default DatePicker;
