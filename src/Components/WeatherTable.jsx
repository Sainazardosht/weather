import React from "react";
import weatherDescription from "../utils/weatherDescription";

const WeatherTable = ({ weather }) => {
  if (!weather || !weather.daily) return null;
  return (
    <div className="weather-info m-3 border-2 border-sky-950 rounded-md overflow-hidden">
      <table className="table-auto">
        <thead>
          <tr className="bg-sky-950 text-sky-100 border-b-2 border-sky-400">
            <th className="uppercase text-sky-100 text-center p-2">Date</th>
            <th className="uppercase text-sky-100 text-center p-2 md:table-cell hidden">Max Temp</th>
            <th className="uppercase text-sky-100 text-center p-2 md:table-cell hidden">Min Temp</th>
            <th className="uppercase text-sky-100 text-center p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {weather.daily.time.map((date, index) => (
            <tr key={index} className="border-b-2 border-sky-950 odd:bg-sky-100 even:bg-sky-50">
              <td className="text-sky-950 text-center p-3">{date}</td>
              <td className="text-sky-950 text-center p-3 md:table-cell hidden">
                {weather.daily.temperature_2m_max[index]}°C
              </td>
              <td className="text-sky-950 text-center p-3 md:table-cell hidden">
                {weather.daily.temperature_2m_min[index]}°C
              </td>
              <td className="text-sky-950 text-center p-3">
                {weatherDescription[weather.daily.weather_code[index]] || "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
