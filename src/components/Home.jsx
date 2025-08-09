import React from 'react'
import PropTypes from 'prop-types';
import './Home.css';

import Header from './Header';

const Home = ({ city, setCity, getWeather, weather}) =>(
  <div className='home'>
    <Header city={city} setCity={setCity} getWeather={getWeather} />
    <div className="weather-container">
      {weather && (
      <div style={{ marginTop: '20px' }}>
        <h2>{weather.name}</h2>
        <p>Temperature: {Math.round(weather.main?.temp||0)}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>
    )}
    </div>
    
  </div>
)
Home.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  weather: PropTypes.object
}

export default Home