import React, { useState, useEffect } from 'react';
import Heading from './Components/Heading';
import Favorite from './Components/Favorite';
import MainDisplay from './Components/MainDisplay';
import { fetchCoordinates, fetchWeather } from './Services/fetchWeather';

function App() {
  const [location, setLocation] = useState('Bangkok');
  const [favorite, setFavorite] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    handlePlace('Bangkok');
  }, []);

  async function handlePlace(query) {
    setLocation(query);
    const coordinates = await fetchCoordinates(query);
    if (coordinates) {
      const weatherData = await fetchWeather(coordinates.latitude, coordinates.longitude);
      setWeather(weatherData);
    }
  }

  async function handleFavorite(favItem) {
    if (favorite.some((item) => item.name === favItem)) {
      alert("You already added this city.");
      return;
    }

    try {
      let temperature;

      // ใช้ข้อมูลที่มีอยู่แล้ว ถ้า favItem เป็นเมืองที่แสดงอยู่
      if (favItem === location && weather) {
        temperature = weather.hourly.temperature_2m[0];
      } else {
        // ถ้าเป็นเมืองใหม่ ค่อยเรียก API
        const coordinates = await fetchCoordinates(favItem);
        if (!coordinates) return;
        const weatherData = await fetchWeather(coordinates.latitude, coordinates.longitude);
        if (!weatherData) return;
        temperature = weatherData.hourly.temperature_2m[0];
      }

      setFavorite((prevFavorites) => [
        ...prevFavorites,
        { name: favItem, temperature },
      ]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  }

  function deleteNote(index) {
    setFavorite((prevFavorites) => prevFavorites.filter((_, i) => i !== index));
  }

  function currentTown(place) {
    handlePlace(place);
  }

  return (
    <>
      <Heading handlePlace={handlePlace} />
      <MainDisplay handleFavorite={handleFavorite} location={location} weather={weather} />
      <Favorite favorite={favorite} currentTown={currentTown} deleteNote={deleteNote} />
    </>
  );
}

export default App;