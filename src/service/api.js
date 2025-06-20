const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = import.meta.env.VITE_API_KEY;   

async function fetchCityWeather(city) {
  if (!city.trim()) {
    throw new Error("City name cannot be empty");
  }

  try {
    const response = await fetch(
        `${BASE_URL}weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found");
      } else if (response.status === 401) {
        throw new Error("Invalid API key");
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error; 
  }
}



export { fetchCityWeather };