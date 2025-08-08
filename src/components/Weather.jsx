import React, {useState} from 'react'

const Weather = () => {
  const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
  
    const getWeather = async () => {
      const response = await fetch(`https://weather-app-backend-do56.onrender.com/weather?city=${city}&units=metric')`);
      const data = await response.json();
      setWeather(data);
    };
  
    return (
      <div style={{ padding: '20px' }}>
        <h1>Weather App</h1>
        <input 
          type="text" 
          value={city} 
          placeholder="Enter city" 
          onChange={e => setCity(e.target.value)} 
        />
        <button onClick={getWeather}>Get Weather</button>
  
        {weather && (
          <div style={{ marginTop: '20px' }}>
            <h2>{weather.name}</h2>
            <p>Temperature: {Math.round(weather.main.temp)}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    );
}

export default Weather