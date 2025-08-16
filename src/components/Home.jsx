/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Home.css';
import './Map.css';
import Header from './Header';
import { assets } from '../config/assets';

// Fix Leaflet's default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Home = ({ city, setCity, getWeather, weather }) => {
  const [forecast, setForecast] = useState(null);
  const [mapState, setMapState] = useState({
    viewState: {
      latitude: 43.6532, // Default to Toronto
      longitude: -79.3832,
      zoom: 10
    },
    loading: false,
    error: null
  });

  // Fetch map data when city changes
  // Update map when weather data changes
  useEffect(() => {
    if (weather && weather.coord) {
      setMapState({
        viewState: {
          latitude: weather.coord.lat,
          longitude: weather.coord.lon,
          zoom: 10
        },
        loading: false,
        error: null
      });
    }
  }, [weather]);


  const fetchForecast = async () => {
    try {
      const response = await fetch(`https://weather-app-backend-do56.onrender.com/forecast?city=${city}`);
      const data = await response.json();
      
      // Process forecast data to get daily max/min temps and precipitation
      const dailyForecast = data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = {
            date,
            weather: item.weather,
            main: {
              temp_max: item.main.temp_max,
              temp_min: item.main.temp_min
            },
            pop: item.pop || 0
          };
        } else {
          // Update max/min temps
          acc[date].main.temp_max = Math.max(acc[date].main.temp_max, item.main.temp_max);
          acc[date].main.temp_min = Math.min(acc[date].main.temp_min, item.main.temp_min);
        }
        return acc;
      }, {});
      
      setForecast(dailyForecast);
    } catch (error) {
      console.error("Forecast error:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchForecast();
    }
  }, [city]);

  return (
    <div className='home'>
      <Header city={city} setCity={setCity} getWeather={getWeather} weather={weather} />
      
      <div className="content">
        {weather && (
          <div className="location-header">
            <p>Current Location</p>
            <h2>{weather.name || 'Locating...'}</h2>
          </div>
        )}
        
        <div className="cards-container">
          {/* Card 1: Current Weather */}
          <div className="weather-card">
            <h3>Current Weather</h3>
            {weather ? (
              <div className="current-weather">
                <div className="weather-main">
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} 
                    alt={weather.weather?.[0]?.description || 'Weather icon'} 
                  />
                  <div className="weather-temp">
                    <div className="temp-value">
                      {Math.round(weather.main?.temp || 0)}°C
                    </div>
                    <div className="temp-description">
                      {weather.weather?.[0]?.description || ''}
                    </div>
                    <div className="temp-feels">
                      Feels like {Math.round(weather.main?.feels_like || 0)}°C
                    </div>
                  </div>
                </div>
                <div className="sub-details">
                  <div className="detail-item">
                    <img src={assets.humidity} alt="Humidity" />
                    <div>
                      <div className="detail-label">Humidity</div>
                      <div>{weather.main?.humidity || 0}%</div>
                    </div>
                  </div>
                  <div className="detail-item">
                    <img src={assets.wind} alt="Wind" />
                    <div>
                      <div className="detail-label">Wind</div>
                      <div>{(weather.wind?.speed * 3.6 || 0).toFixed(1)} km/h</div>
                    </div>
                  </div>
                  <div className="detail-item">
                    <img src={assets.pressure} alt="Pressure" />
                    <div>
                      <div className="detail-label">Pressure</div>
                      <div>{weather.main?.pressure || 0} hPa</div>
                    </div>
                  </div>
                  <div className="detail-item">
                    <img src={assets.visibility} alt="Visibility" />
                    <div>
                      <div className="detail-label">Visibility</div>
                      <div>{(weather.visibility / 1000 || 0).toFixed(1)} km</div>
                    </div>
                  </div>
                  <div className="detail-item">
                    <img src={assets.uvIndex} alt="UV Index" />
                    <div>
                      <div className="detail-label">UV Index</div>
                      <div>{weather.uvi || 0}</div>
                    </div>
                  </div>
                  <div className="detail-item">
                    <img src={assets.dewPoint} alt="Dew Point" />
                    <div>
                      <div className="detail-label">Dew Point</div>
                      <div>{Math.round(weather.main?.dew_point || 0)}°C</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading weather...</p>
            )}
          </div>

          {/* Card 2: 5-Day Forecast */}
          <div className="forecast-card">
            <h3>5-Day Forecast</h3>
            {forecast ? (
              <div className="forecast-days">
                {Object.entries(forecast).slice(0, 5).map(([date, data], index) => {
                  const isToday = index === 1; // Highlight today (index 1 in your current setup)
                  return (
                    <div 
                      key={date} 
                      className={`forecast-day ${isToday ? 'today' : 'other-day'}`}
                    >
                      <div className="day-header">
                        {index === 0 ? 'Yesterday' : 
                        index === 1 ? 'Today' : 
                        index === 2 ? 'Tomorrow' :
                        new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                      </div>
                      <div className="weather-icon">
                        <img
                          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                          alt={data.weather[0].description}
                        />
                      </div>
                      <div className="temp-range">
                        {Math.round(data.main.temp_max)}°/{Math.round(data.main.temp_min)}°
                      </div>
                      <div className="precipitation">
                        {Math.round(data.pop * 100)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Loading forecast...</p>
            )}
          </div>
          {/* Card 3: Map */}
          <div className="map-card">
            <h3>{city} Location</h3>
            {mapState.error ? (
              <div className="map-error">
                {mapState.error}
                <button onClick={() => window.location.reload()}>Retry</button>
              </div>
            ) : mapState.loading ? (
              <div className="map-loading">Loading map data...</div>
            ) : (
              <div style={{ height: '250px', width: '100%' }}>
                <MapContainer
                  center={[mapState.viewState.latitude, mapState.viewState.longitude]}
                  zoom={mapState.viewState.zoom}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[mapState.viewState.latitude, mapState.viewState.longitude]}>
                    <Popup>
                      {weather?.name || 'Location'}<br />
                      {weather?.main?.temp ? `${Math.round(weather.main.temp)}°C` : ''}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  weather: PropTypes.object
};

Home.defaultProps = {
  city: 'Toronto',
  weather: null
};

export default Home;