import React, { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = "598bf0a0109d4d201c0228e96115fd92";
  const fetchWeatherData = async () => {
    setError(null);
    setWeatherData(null);
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("City not found.");
        } else {
          setError("Failed to fetch weather data.");
        }
        return;
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearchClick = () => {
    fetchWeatherData();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.querySelector(".app-container").classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.querySelector(".app-container").classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`p-8 rounded-lg shadow-md w-full max-w-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Weather App</h2>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {darkMode ? "LightTheme" : "DarkTheme"}
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "border-gray-300"
          }`}
        />
      </div>
      <button
        onClick={handleSearchClick}
        className={`w-full p-2 rounded ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        Get Weather
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {weatherData && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <div className="flex items-center mt-2">
            <p className="mt-2">{weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
