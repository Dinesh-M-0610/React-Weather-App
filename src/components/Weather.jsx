import { useState, useEffect } from "react"
import "./Weather.css"

const Weather = () => {

  const API_KEY = 'YOUR API KEY HERE'
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      )
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather()
  }

  const getBackgroundColor = (temp) => {
    if (temp < 10) return "cold"
    if (temp < 20) return "cool"
    if (temp < 30) return "warm"
    return "hot"
  }

  return (
    <div className={`weather-card ${weatherData ? getBackgroundColor(weatherData.main.temp) : "default"}`}>
      <div className="current-time">{currentTime}</div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="search-input"
          />
        </form>
        <div className="weather-info">
          <h2 className="city-name">{weatherData ? weatherData.name : "City Name"}</h2>
          <p className="temperature">{weatherData ? `${Math.round(weatherData.main.temp)}°C` : "--°C"}</p>
          <p className="description">{weatherData ? weatherData.weather[0].description : "Weather description"}</p>
        </div>
      </div>
      <div className="weather-data">
        <div className="col">
          <div>
            <p>{weatherData ? `${weatherData.main.humidity}%` : "--"}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <div>
            <p>{weatherData ? `${weatherData.wind.speed} km/h` : "--"}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather

