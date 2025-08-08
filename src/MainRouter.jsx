import React from 'react'
import {Routes, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Map from './components/Map';
import Setting from './components/Setting';
import Weather from './components/Weather';
import NavBar from './components/NavBar';

const MainRouter = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Map />} />
      <Route path="/setting" element={<Setting />}/>
      <Route path="/weather" element={<Weather />} />
    </Routes>
    </>
    
  )
}

export default MainRouter