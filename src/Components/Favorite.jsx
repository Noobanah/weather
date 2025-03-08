import Card from "./Card";
import React, { useState, useEffect } from 'react';
import { fetchCoordinates, fetchWeather } from '../Services/fetchWeather';
import './card.css';

export default function Favorite({ locations, deleteNote, onLocationPicked }) {
  return (
    <ul className="favorite-list">
      {locations.map((item, index) => (
        <Card
          key={index}
          index={index}
          place={item.name}
          temperature={item.temperature}
          deleteNote={() => deleteNote(index)}
          currentTown={() => onLocationPicked(item.name)}
        />
      ))}
    </ul>
  );
}