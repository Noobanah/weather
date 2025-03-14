import React from 'react';
import '../index.css';

export default function SearchBar({ onSearchEntered }) {
  function toSearch(event) {
    if (event.key === 'Enter') {
      const searchValue = event.target.value.trim();
      if (searchValue) {
        onSearchEntered(searchValue);
      }
      event.target.value = '';
    }
  }

  return (
    <>
      <div className="head-container">
        <h1 id="app-name" className="h-item">
          Weather
        </h1>
        <input
          className="h-item"
          id="search"
          placeholder="type name of city in english, then press Enter!"
          onKeyDown={toSearch}
        />
      </div>
    </>
  );
}