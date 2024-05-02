import React from "react";

//labeling
const EventDetails = ({ location, time, date }) => {
  return (
    <div>
      <h2>Event Details</h2>
      <p>Location: {location}</p>
      <p>Time: {time}</p>
      <p>Date: {date}</p>
    </div>
  );
};

export default EventDetails;
