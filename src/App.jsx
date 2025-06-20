import React ,{useState}from 'react'

const App = () => {

  const[city,setCity]=useState("")

  function handleCityChange(e){
    setCity(e.target.value)
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

         <button className='search-btn'>
          Search
         </button>

         <p>{city}</p>
      </div>
    </div>
  )
}

export default App
