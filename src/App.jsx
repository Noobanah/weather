import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar.jsx';
import Favorite from './Components/Favorite';
import MainDisplay from './Components/MainDisplay';
import { fetchCoordinates, fetchWeather } from './Services/fetchWeather';

function App() {
  const [locationName, setLocationName] = useState('Bangkok');
  const [weather, setWeather] = useState(null);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSearch(searchValue) {
    setLocationName(searchValue);
    fetchData();
  }

  async function handleFavoriteAdded(favItem) {
    if (favoriteLocations.some((item) => item.name === favItem)) {
      alert("You already added this city.");
      return;
    }

    try {
      let temperature;

      // ใช้ข้อมูลที่มีอยู่แล้ว ถ้า favItem เป็นเมืองที่แสดงอยู่
      if (favItem === locationName && weather) {
        temperature = weather.hourly.temperature_2m[0];
      } else {
        // ถ้าเป็นเมืองใหม่ ค่อยเรียก API
        const coordinates = await fetchCoordinates(favItem);
        if (!coordinates) return;
        const weatherData = await fetchWeather(coordinates.latitude, coordinates.longitude);
        if (!weatherData) return;
        temperature = weatherData.hourly.temperature_2m[0];
      }

      setFavoriteLocations((prevFavoriteLocations) => [
        ...prevFavoriteLocations,
        { name: favItem, temperature },
      ]);
    } catch (error) {
      console.error("Error adding favoriteLocations:", error);
    }
  }

  function deleteNote(index) {
    setFavoriteLocations((prevFavorites) => prevFavorites.filter((_, i) => i !== index));
  }

  function handleFavoriteLocationPicked(pickedLocation) {
    setLocationName(pickedLocation);
    fetchData();s
  }

  async function fetchData() {
    const coordinates = await fetchCoordinates(locationName);
    if (coordinates) {
      const weatherData = await fetchWeather(coordinates.latitude, coordinates.longitude);
      setWeather(weatherData);
    }
  }

  return (
    <>
      <SearchBar onSearchEntered={handleSearch} />
      <MainDisplay location={locationName} weather={weather} onFavoriteAdded={handleFavoriteAdded}/>
      <Favorite locations={favoriteLocations} onLocationPicked={handleFavoriteLocationPicked} deleteNote={deleteNote} />
    </>
  );
}

export default App;