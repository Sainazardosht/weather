import { useState } from "react";
import FetchWeatherData from "./fetchWeatherData";
import { createContext } from "react";
import WeatherTable from "./WeatherTable";
export const MyContext = createContext();
const GetWeather = () => {
  const [weather, setWeather] = useState(null);
  return (
    <MyContext.Provider value={{weather, setWeather}}>
    <div className="weather-app flex flex-col items-center justify-center h-full">
    <FetchWeatherData />
    
    <WeatherTable weather={weather} />
    </div>
    </MyContext.Provider>
  );
  
}
export default GetWeather;