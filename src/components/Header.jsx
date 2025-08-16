import React from 'react';
import './Header.css';
import { assets } from '../config/assets';

const Header = ({ city, setCity, getWeather }) => (
  <header className="header" style={{ backgroundImage: `url(${assets.headerBackground})` }}>
    <div className="header-content">
      <div className="search-container">
        <input 
          type="text" 
          value={city} 
          placeholder="Enter city name" 
          onChange={(e) => setCity(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && getWeather()} 
          className="search-input"
          aria-label="Search for a city"
        />
        <button 
          onClick={() => getWeather()}
          className="search-button"
          aria-label="Search weather"
        >
          <img src={assets.searchIcon} alt="Search" className="search-icon"/>
        </button>
      </div>
    </div>
  </header>
);

export default Header;