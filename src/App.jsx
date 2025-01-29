import { useState } from "react";
import "./App.css";
import axios from "axios";
const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle (Light)",
  53: "Drizzle (Moderate)",
  55: "Drizzle (Dense)",
  56: "Freezing Drizzle (Light)",
  57: "Freezing Drizzle (Dense)",
  61: "Rain (Slight)",
  63: "Rain (Moderate)",
  65: "Rain (Heavy)",
  66: "Freezing Rain (Light)",
  67: "Freezing Rain (Heavy)",
  71: "Snow fall (Slight)",
  73: "Snow fall (Moderate)",
  75: "Snow fall (Heavy)",
  77: "Snow grains",
  81: "Rain showers (Slight)",
  82: "Rain showers (Moderate)",
  80: "Rain showers (Violent)",
  85: "Snow showers (Slight)",
  86: "Snow showers (Heavy)",
};


function App() {
  const [lat, setLat] = useState(52.52);
  const [lon, setLon] = useState(13.41);
  const [weather, setWeather] = useState("");

  async function fetchWeatherData() {
    if (!lat || !lon) return alert("Please enter valid coordinates!");
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day&minutely_15=weather_code&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min`
      );
      setWeather(res.data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  return (
    <div className="weather-app flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-bold font-serif m-10 text-sky-900" style={{WebkitTextStroke: "2px oklch(0.293 0.066 243.157)" }}>Weather App</h1>
      <div className="flex flex-col items-center md:flex-row md:justify-start">
        <input className="border-2 text-sky-950 border-sky-900 p-2 m-3 rounded-md cursor-pointer hover:bg-sky-200 transition ease-in-out duration-500 md:inline block focus:outline-offset-1 focus:outline-sky-800"
          type="number"
          placeholder="Enter latitude"
          value={lat}
          onChange={(event) => setLat(event.target.value)}
        />
        <input className="border-2 text-sky-950 border-sky-900 p-2 m-3 rounded-md cursor-pointer hover:bg-sky-200 transition ease-in-out duration-500 md:inline block focus:outline-offset-2 focus:outline-sky-800"
          type="number"
          placeholder="Enter longitude"
          value={lon}
          onChange={(event) => setLon(event.target.value)}
        />
        <button className="border-2 text-sky-950 border-sky-900 p-2 m-3 rounded-md cursor-pointer hover:bg-sky-200 transition ease-in-out duration-500  md:inline block font-semibold" onClick={fetchWeatherData}>
          Get Weather
        </button>
      </div>

      {weather && (
        <div className="weather-info  m-3 border-2 border-sky-950 rounded-md overflow-hidden">
          <table className="table-auto">
            <thead>
              <tr  className="bg-sky-950 text-sky-100 border-b-2 border-sky-400">
                <th className=" uppercase text-sky-100 text-center p-2 ">Date</th>
                <th className=" uppercase text-sky-100 text-center p-2 md:table-cell hidden">Max Temp</th>
                <th className=" uppercase text-sky-100 text-center p-2 md:table-cell hidden">Min Temp</th>
                <th className=" uppercase text-sky-100 text-center p-2 ">Status</th>
              </tr>
            </thead>
            <tbody>
              {weather.daily.time.map((date, index) => (
                <tr key={index} className=" border-b-2 border-sky-950 odd:bg-sky-100 even:bg-sky-50 nth-last-1:border-0">
                  <td className=" text-sky-950 text-center p-3">{date}</td>
                  <td className=" text-sky-950 text-center p-3 md:table-cell hidden">{weather.daily.temperature_2m_max[index]}°C</td>
                  <td className=" text-sky-950 text-center p-3 md:table-cell hidden">{weather.daily.temperature_2m_min[index]}°C</td>
                  <td className=" text-sky-950 text-center p-3">{weatherDescriptions[weather.daily.weather_code[index]]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
