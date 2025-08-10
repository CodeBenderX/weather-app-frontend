import React, {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom';

import About from './components/About';
import Map from './components/Map';
import Settings from './components/Settings';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Contact from './components/Contact';

const MainRouter = () => {
  const[city, setCity] = React.useState('');
  const[weather, setWeather] = React.useState(null);
  const getWeather = async (cityName) => {
  const response = await fetch(
    `https://weather-app-backend-do56.onrender.com/weather?city=${cityName}&units=metric`
  );
  const data = await response.json();
  setWeather(data);
};
  // Auto-detect location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode to get city name
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const geoData = await geoRes.json();

          const detectedCity = geoData.city || geoData.locality || "Toronto";
          setCity(detectedCity);
          getWeather(detectedCity);
        },
        (error) => {
          console.error("Geolocation failed:", error);
          // Fallback to default city
          const defaultCity = "Toronto";
          setCity(defaultCity);
          getWeather(defaultCity);
        }
      );
    } else {
      console.error("Geolocation not supported");
      const defaultCity = "Toronto";
      setCity(defaultCity);
      getWeather(defaultCity);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home city={city} setCity={setCity} getWeather={getWeather} weather={weather} />} />
      <Route path="/about" element={<About />} />
      <Route path="/map" element={<Map />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/settings" element={<Settings />}/>
    </Routes>
    </>
    
  )
}

export default MainRouter