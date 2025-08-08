import React from 'react'
import {Routes, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Map from './components/Map';
import Settings from './components/Settings';
import Weather from './components/Weather';
import NavBar from './components/NavBar';
import Contact from './components/Contact';

const MainRouter = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/map" element={<Map />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/settings" element={<Settings />}/>
      <Route path="/weather" element={<Weather />} />
    </Routes>
    </>
    
  )
}

export default MainRouter