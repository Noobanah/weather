import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar.jsx';
import Favorite from './Components/Favorite';
import MainDisplay from './Components/MainDisplay';
import Location from "./Model/Location.js";
import { fetchCoordinates, fetchWeather, fetchLocations } from './Services/fetchWeather';

function App() {
  const [searchQuery, setSearchQuery] = useState('Bangkok');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    fetchData().then()
    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, [searchQuery]);

  function handleSearchEntered(searchValue) {
    setSearchQuery(() => searchValue);
  }

  function handleFavoriteAdded(addedFavoriteLocation) {
    if (favoriteLocations.some((favoriteLocation) => favoriteLocation.name === addedFavoriteLocation.name)) {
      alert("You already added this city.");
      return;
    }

    try {
      setFavoriteLocations((prevFavoriteLocations) => [
        ...prevFavoriteLocations,
        addedFavoriteLocation,
      ]);
    } catch (error) {
      console.error("Error adding favoriteLocations:", error);
    }
  }

  function handleFavoriteLocationPicked(pickedLocation) {
    setSearchQuery(() => pickedLocation);
  }

  function handleFavoriteLocationDeleted(index) {
    setFavoriteLocations((prevFavorites) => prevFavorites.filter((_, i) => i !== index));
  }

  async function fetchData() {
    const fetchedCoordinates = await fetchCoordinates(searchQuery);

    if (fetchedCoordinates) {
      const weatherData = await fetchWeather(fetchedCoordinates.latitude, fetchedCoordinates.longitude);

      setCurrentLocation(new Location(
          fetchedCoordinates["name"],
          fetchedCoordinates["latitude"],
          fetchedCoordinates["longitude"],
          weatherData));
    }

    const fetchFavoriteLocationsData = async (prevFavoriteLocations) => {
      const updatedFavoriteLocations = await fetchLocations(prevFavoriteLocations);
      setFavoriteLocations(prev => updatedFavoriteLocations);
    };

    setFavoriteLocations((prevFavoriteLocations) => {
      fetchFavoriteLocationsData(prevFavoriteLocations);
      return prevFavoriteLocations;
    });
  }

  return (
    <>
      <SearchBar onSearchEntered={handleSearchEntered} />
      <MainDisplay location={currentLocation} onFavoriteAdded={handleFavoriteAdded} />
      <Favorite locations={favoriteLocations}
                onLocationPicked={handleFavoriteLocationPicked}
                onLocationDeleted={handleFavoriteLocationDeleted} />
    </>
  );
}

export default App;