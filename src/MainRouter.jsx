import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import About from './components/About';
import Map from './components/Map';
import Settings from './components/Settings';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Contact from './components/Contact';

const MainRouter = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isCurrentLocation, setIsCurrentLocation] = useState(true);

  const getWeather = async (cityName) => {
    setIsCurrentLocation(false);
    const response = await fetch(
      `https://weather-app-backend-do56.onrender.com/weather?city=${cityName}&units=metric`
    );
    const data = await response.json();
    setWeather(data);
  };

  const getWeatherFromLocation = async (lat, lon) => {
    try {
      setIsCurrentLocation(true);
      const response = await fetch(
        `https://weather-app-backend-do56.onrender.com/weather?lat=${lat}&lon=${lon}&units=metric`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeather(data);
      setCity(data.name);
    } catch (error) {
      console.error("Error fetching weather from location:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getWeatherFromLocation(latitude, longitude);
        },
        () => {
          setCity("Toronto");
          getWeather("Toronto");
        }
      );
    } else {
      setCity("Toronto");
      getWeather("Toronto");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home city={city} setCity={setCity} getWeather={getWeather} weather={weather} />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default MainRouter;
