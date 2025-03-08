import axios from "axios";

export const fetchCoordinates = async (location) => {
  try {
    const encodedLocation = encodeURIComponent(location);
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodedLocation}&count=1`
    );
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&hourly=weathercode`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};