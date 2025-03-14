import axios from "axios";
import Location from "../Model/Location.js";

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

export const fetchLocations = async (locations) => {
  try {
    return Promise.all(locations.map(async (location) => {
      const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m&hourly=weathercode`
      );
      const weather = response.data;
      console.log(`fetchWeathers location: ${location.name} - ${location.latitude}, ${location.longitude} - ${weather?.hourly?.temperature_2m[0]}`);
      return new Location(location.name, location.latitude, location.longitude, weather);
    }));
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

export const findLocation = async (locationName) => {
  try {
    const fetchedCoordinates = await fetchCoordinates(locationName);

    if (fetchedCoordinates) {
      const weatherData = await fetchWeather(fetchedCoordinates.latitude, fetchedCoordinates.longitude);

      return new Location(
          fetchedCoordinates["name"],
          fetchedCoordinates["latitude"],
          fetchedCoordinates["longitude"],
          weatherData);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};