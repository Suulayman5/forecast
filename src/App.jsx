// Import required modules and libraries
import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// OpenWeather API details
const API_KEY='3b701318e883293e95a272705ce8788b'
const BASE_URL='https://api.openweathermap.org/data/2.5'

// Main Application Component
const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch current weather and forecast data
  const fetchWeather = async () => {
    if (!city) return;

    try {
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-red-900 text-white' : 'bg-slate-300 text-black'} min-h-screen p-4`}>
      <div className="flex justify-end">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="py-2 px-4 flex justify-end rounded-[50%] bg-blue-900 text-white focus:outline-none"
        >
          theme
        </button>
      </div>
      <div className="flex items-center justify-center">

      <header className=" items-center mb-6">
        <h1 className="text-2xl font-bold">Weather </h1>
      </header>
      </div>

      {/* Search Bar */}
      <div className="mb-6 p-2 flex flex-col items-center justify-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-[60%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeather}
          className="mt-4  py-2 px-4 w-[50%] bg-blue-900 text-white rounded-lg  focus:outline-none"
        >
          Search
        </button>
      </div>

      {/* Weather Data */}
      {weatherData && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Current Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}

      {/* Forecast Data */}
      {forecastData && (
        <div>
          <h2 className="text-xl font-semibold">5-Day Forecast</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {forecastData.list.slice(0, 5).map((forecast, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {forecast.main.temp}°C</p>
                <p>{forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
