// frontend/src/App.js
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const response = await fetch(`https://weather-app-backend-do56.onrender.com/weather?city=${city}`);
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
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
// This code is a simple React application that fetches weather data from a backend service.
// It allows users to input a city name and displays the current temperature and weather condition for that city.
// The temperature is converted from Kelvin to Celsius for better readability.
// The application uses the Fetch API to make requests to a backend server running on localhost:5000.
// The weather data is displayed dynamically based on the user's input.