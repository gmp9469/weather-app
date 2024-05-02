import React from "react";

//Menu for selecting morning, afternoon, night, or 24hr forecast
const TimeRangeSelector = ({ selectedTimeRange, setSelectedTimeRange }) => {
  return (
    <select
      name="timeRangeSelector"
      id="timeRangeSelector"
      onChange={(e) => setSelectedTimeRange(e.target.value)}
      value={selectedTimeRange}
    >
      <option value="24hr">24hr</option>
      <option value="morning">Morning</option>
      <option value="afternoon">Afternoon</option>
      <option value="night">Night</option>
    </select>
  );
};

export default TimeRangeSelector;
