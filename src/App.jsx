import React ,{useState}from 'react'
import { fetchCityWeather } from './service/api'

const App = () => {

  const[city,setCity]=useState("")
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)

  function handleCityChange(e){
    setCity(e.target.value)
  }

  async function searchcityweather(){
    setLoading(true)
    setError(null)
    try {
      const weatherData = await fetchCityWeather(city)
      setData(weatherData)
    }
    catch (error) {
      setError(error.message)
      }
    finally{
      setLoading(false)
    }
  }


  return (
    <div className='full-weather-form-container'>
      <h1 className='main-heading'>
        SkySense - Weather App
      </h1>
      <div className="input-container">
        <input type="text"
         className='city-input'
         placeholder='Enter City Name...'
         onChange={handleCityChange} 
         value={city}/>

         <button className='search-btn'
         onClick={searchcityweather}
         disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
         </button>
      </div>

      {error && <p className='error-message'>⚠️ {error}</p>}
      {data && (
      <div className="weather-city-display">
        <h3 className='city-name'>{data.name}</h3>
        <img className='main-weather-image' 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
            alt="Weather icon" 
        />        
        <p className='temperature-condition'>{Math.round(data.main.temp)}</p>
        <p className='weather-condition'>{data.weather[0].description}</p>
        <div className="essential-weather-conditions">
          <p className='wind-conditon'>Wind : {data.wind.speed} m/s</p>
          <p className='humidity-condition'>Humidity : {data.main.humidity} %</p>
        </div>
      </div>
    )}
    </div>
  )
}

export default App
