import React from 'react'
import PropTypes from 'prop-types';
import './Home.css';

import Header from './Header';
import { assets } from '../config/assets';

const Home = ({ city, setCity, getWeather, weather}) =>(
  <div className='home'>
    <Header city={city} setCity={setCity} getWeather={getWeather} weather={weather} />
    <div className="content">
      {/* this is the card for current weather */}
      <div className="weather-container" style={{width: '25%'}}>
        {weather ? (
          <div>
            <div className="current-location" style={{display:'flex',flexDirection:'column',padding:0}}>
              <p style={{color:'#5C677D',margin:0}}>Current Location</p>
              <h2 style={{margin:0}}>{weather?.name || 'Locating...'}</h2>
            </div>
            {/* Display current weather icon and temperature */}
            <div className="weather-card" style={{ maxWidth: '100%', borderRadius: '10px', padding: '15px', backgroundColor: 'rgba(240, 244, 248, 0.7)', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {/* Current Weather Section */}
              <div className="current-weather" style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '1.2rem', margin: 0 }}>Current Weather</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img 
                    style={{ height: '80px', width: '80px' }} 
                    src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} 
                    alt={weather.weather?.[0]?.description} 
                  />
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {Math.round(weather.main?.temp || 0)}°C
                    </div>
                    <div style={{ fontSize: '1.1rem', textTransform: 'capitalize', marginBottom: '5px' }}>
                      {weather.weather?.[0]?.description}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      Feels like {Math.round(weather.main?.feels_like || 0)}°C
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="sub-details" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px'
              }}>
                {/* Humidity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={assets.humidity} alt="Humidity" style={{ height: '24px', width: '24px' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Humidity</div>
                    <div>{weather.main?.humidity || 0}%</div>
                  </div>
                </div>

                {/* Wind */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={assets.wind} alt="Wind" style={{ height: '24px' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Wind</div>
                    <div>{(weather.wind?.speed * 3.6 || 0).toFixed(1)} km/h</div>
                  </div>
                </div>

                {/* Pressure */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={assets.pressure} alt="Pressure" style={{ width: '24px' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Pressure</div>
                    <div>{weather.main?.pressure || 0} hPa</div>
                  </div>
                </div>

                {/* Visibility */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={assets.visibility} alt="Visibility" style={{ width: '24px' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Visibility</div>
                    <div>{(weather.visibility / 1000 || 0).toFixed(1)} km</div>
                  </div>
                </div>

                {/* Dew Point */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={assets.dewPoint} alt="Dew Point" style={{ height: '24px' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Dew Point</div>
                    <div>{weather.main?.dew_point || 0}°C</div>
                  </div>
                </div>

                {/* UV Index */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={assets.uvIndex} alt="UV Index" style={{ height: '24px' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>UV Index</div>
                    <div>{weather.uvi || 0}</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      {/* This card contains the 5-day Forecast */}
      </div>
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