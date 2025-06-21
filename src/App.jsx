import React, { useState } from 'react';
import { fetchCityWeather, fetchfivedayweather } from './service/api';

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const popularCities = ["Paris", "New Delhi", "Sydney", "Tokyo", "London", "New York", "Munich", "Los Angeles", "Miami", "Madrid", "Barcelona"];

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  async function searchcityweather() {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchCityWeather(city);
      const forecastData = await fetchfivedayweather(city);
      setData({
        current: weatherData,
        forecast: forecastData
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-wrapper">
      {/* Left Column - Cities */}
      <div className="cities-grid">
        <h3 className='grid-heading'>Popular Cities</h3>
        <div className="cities-list">
          {popularCities.map((cityname) => (
            <button
              className='city-card'
              key={cityname}
              onClick={() => {
                setCity(cityname);
                searchcityweather();
              }}>
              {cityname}
            </button>
          ))}
        </div>
      </div>

      {/* Center Column - Weather Info */}
      <div className='main-weather-container'>
        <div className='full-weather-form-container'>
          <h1 className='main-heading'>SkySense - Weather App</h1>
          <div className="input-container">
            <input
              type="text"
              className='city-input'
              placeholder='Enter City Name...'
              onChange={handleCityChange}
              value={city}
            />
            <button
              className='search-btn'
              onClick={searchcityweather}
              disabled={loading}
            >
              Search
            </button>
          </div>

          {error && <p className='error-message'>⚠️ {error}</p>}

          {data.current && (
            <div className="weather-city-display">
              <h3 className='city-name'>{data.current.name}</h3>
              <img
                className='main-weather-image'
                src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
              <p className='temperature-condition'>{Math.round(data.current.main.temp)}°C</p>
              <p className='weather-condition'>
                {data.current.weather[0].description.charAt(0).toUpperCase() +
                  data.current.weather[0].description.slice(1)}
              </p>
              <div className="essential-weather-conditions">
                <p className='wind-condition'>💨 <br />Wind: {data.current.wind.speed} m/s</p>
                <p className='humidity-condition'>💧 <br />Humidity: {data.current.main.humidity}%</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {data.forecast && (
        <div className="forecast-container">
          <div className="forecast-heading">
            <h3>5 Day Forecast</h3>
          </div>
          <div className="forecast-grid">
          {data.forecast?.list?.filter((_, index) => index % 8 === 0).slice(0, 5).map((day, index) => (
              <div className="forecast-card" key={`${day.dt}_${index}`}>
                <p className="forecast-day">
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
              <img
                className='temp-icons'
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={`${day.weather[0].main} weather icon`}
              />
              <p className='weather-forecast-condition'>
                  {day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)}
              </p>
              <p className='forecast-min-max'>
                  {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
              </p>
          </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
