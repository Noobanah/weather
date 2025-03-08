import Card from "./Card";
import React, { useState, useEffect } from 'react';
import { fetchCoordinates, fetchWeather } from '../Services/fetchWeather';
import './card.css';

export default function Favorite({ favorite, deleteNote, currentTown }) {
  const [updatedFavorites, setUpdatedFavorites] = useState(favorite);

  useEffect(() => {
    async function updateTemperatures() {
      const updatedList = await Promise.all(
        favorite.map(async (item) => {
          const coordinates = await fetchCoordinates(item.name);
          if (coordinates) {
            const weatherData = await fetchWeather(coordinates.latitude, coordinates.longitude);
            return { ...item, temperature: weatherData?.hourly?.temperature_2m[0] || 'N/A' };
          }
          return item;
        })
      );
      setUpdatedFavorites(updatedList);
    }

    updateTemperatures();
  }, [favorite]);

  return (
    <ul className="favorite-list">
      {updatedFavorites.map((item, index) => (
        <Card
          key={index}
          index={index}
          place={item.name}
          temperature={item.temperature}
          deleteNote={() => deleteNote(index)}
          currentTown={() => currentTown(item.name)}
        />
      ))}
    </ul>
  );
}