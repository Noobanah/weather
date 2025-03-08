import Card from "./Card";
import React, { useState, useEffect } from 'react';
import { fetchCoordinates, fetchWeather } from '../Services/fetchWeather';
import './card.css';

export default function Favorite({ locations, onLocationDeleted, onLocationPicked }) {
  return (
    <ul className="favorite-list">
      {locations.map((item, index) => (
        <Card
          key={index}
          index={index}
          place={item.name}
          temperature={item.weather?.hourly?.temperature_2m?.[0]}
          deleteNote={() => onLocationDeleted(index)}
          currentTown={() => onLocationPicked(item.name)}
        />
      ))}
    </ul>
  );
}