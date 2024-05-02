import React from "react";

//Calculate YYYY-MM-DD format date for event
export const getEventDayDate = (day) => {
  const now = new Date();
  const currentHour = now.getHours();
  const temp = currentHour >= 12 ? 1 : 0;
  const currentDate = new Date();
  const daysUntilEventDay =
    ((7 + getEventDayIndex(day) - currentDate.getDay()) % 7) - temp;
  const eventDayDate = new Date(
    currentDate.getTime() + daysUntilEventDay * 24 * 60 * 60 * 1000
  );
  console.log(currentDate.getTime() + daysUntilEventDay * 24 * 60 * 60 * 1000);
  return eventDayDate.toISOString().split("T")[0];
};

const getEventDayIndex = (day) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days.indexOf(day);
};

//Calculate YYYY-MM-DD format date for event next week
export const getNextWeekDate = (currentDate) => {
  const nextWeekDate = new Date(
    new Date(currentDate).getTime() + 7 * 24 * 60 * 60 * 1000
  );
  return nextWeekDate.toISOString().split("T")[0];
};

// gets hourly data for the day
export const filterHoursData = (hours, range) => {
  if (!hours) return [];
  const ranges = {
    "24hr": hours,
    morning: hours.filter((hour) => {
      const hourOfDay = parseInt(hour.datetime.split(":")[0], 10);
      return hourOfDay >= 8 && hourOfDay < 12;
    }),
    afternoon: hours.filter((hour) => {
      const hourOfDay = parseInt(hour.datetime.split(":")[0], 10);
      return hourOfDay >= 12 && hourOfDay < 17;
    }),
    night: hours.filter((hour) => {
      const hourOfDay = parseInt(hour.datetime.split(":")[0], 10);
      return hourOfDay >= 17 && hourOfDay < 21;
    }),
  };
  return ranges[range];
};

// Gets data for the median hour of the selected time range, or full day data if the range is "24hr"
export const getMedianHourData = (dayData, hours, range) => {
  if (range === "24hr") {
    // Return the whole day data when the range is "24hr"
    return dayData;
  }

  let filteredHours;
  switch (range) {
    case "morning":
      filteredHours = hours.filter((hour) => {
        const hourOfDay = parseInt(hour.datetime.split(":")[0], 10);
        return hourOfDay >= 8 && hourOfDay < 12;
      });
      break;
    case "afternoon":
      filteredHours = hours.filter((hour) => {
        const hourOfDay = parseInt(hour.datetime.split(":")[0], 10);
        return hourOfDay >= 12 && hourOfDay < 17;
      });
      break;
    case "night":
      filteredHours = hours.filter((hour) => {
        const hourOfDay = parseInt(hour.datetime.split(":")[0], 10);
        return hourOfDay >= 17 && hourOfDay < 21;
      });
      break;
    default:
      return dayData;
  }
  return filteredHours.length > 0
    ? filteredHours[Math.floor(filteredHours.length / 2)]
    : dayData;
};
