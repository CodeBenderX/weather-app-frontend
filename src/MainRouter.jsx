import React from 'react'
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
  const getWeather = async () => {
    const response = await fetch(`https://weather-app-backend-do56.onrender.com/weather?city=${city}&units=metric`);
    const data = await response.json();
    setWeather(data);
  }
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