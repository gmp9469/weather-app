import React from "react";

//Menu to choose day of week
const DaySelector = ({ selectedDay, setSelectedDay }) => {
  return (
    <select
      name="daySelector"
      id="daySelector"
      onChange={(e) => setSelectedDay(e.target.value)}
      value={selectedDay}
    >
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Saturday">Saturday</option>
      <option value="Sunday">Sunday</option>
    </select>
  );
};

export default DaySelector;
