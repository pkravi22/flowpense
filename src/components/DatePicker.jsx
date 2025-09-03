"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState(new Date()); // today
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7)) // 7 days later
  );

  return (
    <div className="p-4 flex gap-2 items-center ">
      <span>Compare to: </span>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setStartDate(update[0]);
          setEndDate(update[1]);
        }}
        isClearable={true}
        dateFormat="d MMM yyyy" // 👈 shows like "1 Jan 2025"
        className="border pl-2 pr-6 py-1 rounded-3xl"
      />
    </div>
  );
}
