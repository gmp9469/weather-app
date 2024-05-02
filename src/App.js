import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import WeatherCard from "./components/WeatherCards";
import WeatherChart from "./components/WeatherChart";
import LocationInput from "./components/LocationInput";
import DaySelector from "./components/DayofWeek";
import TimeRangeSelector from "./components/TimeRange";
import fetchWeather from "./utils/visualCrossingAPI";
import {
  getEventDayDate,
  getNextWeekDate,
  filterHoursData,
  getMedianHourData,
} from "./utils/dateUtils";
import "./styles/styles.css";

const App = () => {
  const [eventDayWeather, setEventDayWeather] = useState(null);
  const [nextWeekWeather, setNextWeekWeather] = useState(null);
  const [location, setLocation] = useState("New York, NY");
  const [inputLocation, setInputLocation] = useState("New York, NY");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24hr");
  const [backgroundImage, setBackgroundImage] = useState("./images/purple.jpg");
  const [medianHourWeather, setMedianHourWeather] = useState(null);
  const [medianNextWeekWeather, setMedianNextWeekWeather] = useState(null);

  //fetching Data from Visual Crossing
  useEffect(() => {
    if (location && selectedDay) {
      const eventDate = getEventDayDate(selectedDay);
      const nextWeekDate = getNextWeekDate(eventDate);
      fetchWeather(location, eventDate).then((data) => {
        if (data) {
          const eventDay = data.days.find((day) => day.datetime === eventDate);
          const nextWeekDay = data.days.find(
            (day) => day.datetime === nextWeekDate
          );
          setEventDayWeather(eventDay);
          setNextWeekWeather(nextWeekDay);

          const medianData = getMedianHourData(
            eventDay,
            eventDay.hours,
            selectedTimeRange
          );
          const medianNextWeekData = getMedianHourData(
            nextWeekDay,
            nextWeekDay.hours,
            selectedTimeRange
          );
          setMedianHourWeather(medianData);
          setMedianNextWeekWeather(medianNextWeekData);
        }
      });
    }
  }, [location, selectedDay, selectedTimeRange]); // re-run on time range, day, and location changes

  //background depends on wheather conditions
  useEffect(() => {
    if (eventDayWeather) {
      let imageSrc = "./images/blue.jpg"; // Default image
      const description = eventDayWeather.conditions.toLowerCase();
      if (description.includes("clear")) {
        imageSrc = "./images/orange.jpg";
      } else if (description.includes("partially")) {
        imageSrc = "./images/purple.jpg";
      } else if (description.includes("rain")) {
        imageSrc = "./images/green.jpg";
      }
      setBackgroundImage(imageSrc);
    }
  }, [eventDayWeather]);

  const formatDate = (date) => {
    if (!date) return "";
    return `${format(parseISO(date), "eeee, MMMM do")}`;
  };

  return (
    <div
      className="background-image"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="leftColumn">
        <h1>Sunny Days</h1>
        <h1></h1>
        <LocationInput
          inputLocation={inputLocation}
          setInputLocation={setInputLocation}
          setLocation={setLocation}
        />
        <DaySelector
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <TimeRangeSelector
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
        />
      </div>

      <div className="rightColumn">
        <div className="weatherContainer">
          {medianHourWeather && (
            <>
              <WeatherCard
                day={`This ${formatDate(eventDayWeather.datetime)}`}
                description={medianHourWeather.conditions}
                temperature={medianHourWeather.temp}
                humidity={medianHourWeather.humidity}
                wind={medianHourWeather.windspeed}
              />
              <WeatherChart
                hoursData={filterHoursData(
                  eventDayWeather.hours,
                  selectedTimeRange
                )}
              />
            </>
          )}
        </div>
        <div className="weatherContainer">
          {medianNextWeekWeather && (
            <>
              <WeatherCard
                day={`Next ${formatDate(nextWeekWeather.datetime)}`}
                description={medianNextWeekWeather.conditions}
                temperature={medianNextWeekWeather.temp}
                humidity={medianNextWeekWeather.humidity}
                wind={medianNextWeekWeather.windspeed}
              />
              <WeatherChart
                hoursData={filterHoursData(
                  nextWeekWeather.hours,
                  selectedTimeRange
                )}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
