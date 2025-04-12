import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { MyContext } from "./GetWeather";
import Loader from "./Loader";
function FetchWeatherData() {
  const { setWeather } = useContext(MyContext);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeatherData() {
    if (!lat || !lon) return alert("Please enter valid coordinates!");
    try {
      setIsLoading(true);
      setWeather("");
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day&minutely_15=weather_code&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min`
      );
      setWeather(res.data);
      setIsLoading(false);
      setLat("");
      setLon("");
    } catch (err) {
      return console.error(err);
    }
  }
  return (
    <>
      <h1
        className="text-6xl font-bold font-serif m-10 text-sky-900"
        style={{ WebkitTextStroke: "2px oklch(0.293 0.066 243.157)" }}
      >
        Weather App
      </h1>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col items-center md:flex-row md:justify-start">
        <input
          className="border-2 text-sky-950 border-sky-900 p-2 m-3 rounded-md cursor-pointer hover:bg-sky-200 transition ease-in-out duration-500 md:inline block focus:outline-offset-1 focus:outline-sky-800"
          type="number"
          placeholder="Enter latitude"
          value={lat}
          onChange={(event) => setLat(event.target.value)}
        />
        <input
          className="border-2 text-sky-950 border-sky-900 p-2 m-3 rounded-md cursor-pointer hover:bg-sky-200 transition ease-in-out duration-500 md:inline block focus:outline-offset-2 focus:outline-sky-800"
          type="number"
          placeholder="Enter longitude"
          value={lon}
          onChange={(event) => setLon(event.target.value)}
        />
        <button
          className="border-2 text-sky-950 border-sky-900 p-2 m-3 rounded-md cursor-pointer hover:bg-sky-200 transition ease-in-out duration-500  md:inline block font-semibold"
          onClick={fetchWeatherData}
        >
          Get Weather
        </button>
      </div>
      )}
    </>
  );
}

export default FetchWeatherData;
