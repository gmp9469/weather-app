//async fetching data from Visual Crossing API
const fetchWeather = async (location) => {
  const API_KEY = "9AVAWJM9A588RMDAHYUFD9ZHR";
  const baseURL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  const encodedLocation = encodeURIComponent(location);

  try {
    const response = await fetch(
      `${baseURL}${encodedLocation}?unitGroup=us&include=hours%2Calerts%2Ccurrent&key=${API_KEY}&contentType=json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default fetchWeather;
