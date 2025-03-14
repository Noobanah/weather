import React from 'react';
import './card.css';

export default function MainDisplay({location, onFavoriteAdded}) {
  if (!location) {
    return <p>Loading</p>;
  }

  const temperature = location.weather?.hourly?.temperature_2m?.[0] || 'not found';
  const weatherCode = location.weather?.hourly?.weathercode?.[0] || 0;

  function getWeatherClass(code) {
    if (code === 0) return "clear";
    if ([1, 2, 3].includes(code)) return "cloudy"; 
    if ([45, 48].includes(code)) return "fog";
    if ([51, 53, 55].includes(code)) return "drizzle"; 
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "rain"; 
    if ([71, 73, 75, 85, 86].includes(code)) return "snow"; 
    if ([95, 96, 99].includes(code)) return "thunderstorm"; 
    return "default";
  }

  const weatherClass = getWeatherClass(weatherCode);

  function toAddFavorite() {
    onFavoriteAdded(location);
  }

  return (
    <div className={`main-display ${weatherClass}`}>
      <h2>{location.name}</h2>
      <h1>{temperature}°C</h1>
      <button className="main-btn" onClick={toAddFavorite}>
        Add to favorite
      </button>
    </div>
  );
}