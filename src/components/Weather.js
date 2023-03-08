import "./Weather.css";
import axios from "axios";
import { currTime } from "./timeConverter";
import React, { useState, useEffect } from "react";

const Weather = () => {
  const [data, setData] = useState(null);
  const [inputCity, setInputCity] = useState("");
  const apiKey = "7854d9c37aa5f2b4157d7c9d14c2a445";
  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    try {
      axios.get(apiURL).then((res) => {
        console.log("response", res);
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="backgroundImage">
        <h1 className="text-color">Weather App</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column col-md-4 my-3"
        >
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInputCity(e.target.value)}
            value={inputCity}
            placeholder="Enter City Name"
          />
          <button
            className="btn btn-primary b-width mx-auto mt-3"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="col-md-12 text-center my-4 ">
        <div className="shadow rounded weatherResultBox">
          <img
            className="weatherIcon"
            src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
            alt="Weather Background"
          />
          {data ? (
            <ul className="list-group mb-2">
              <li className="list-group-item mx-3 my-2 shadow-sm">
                <span className="Bold">
                  {data?.name} , {data?.sys.country}
                </span>
              </li>
              <li className="list-group-item mx-3 mt-2 shadow-sm normaltxt">
                Min : {(data?.main?.temp_min - 273.15).toFixed(2)}°C{" "}
              </li>
              <li className="list-group-item mx-3 mt-2 shadow-sm normaltxt">
                Max : {(data?.main?.temp_max - 273.15).toFixed(2)}°C{" "}
              </li>
              <li className="list-group-item mx-3 mt-2 shadow-sm normaltxt">
                Humidity : {data?.main?.humidity}%{" "}
              </li>
              <li className="list-group-item mx-3 mt-2 shadow-sm normaltxt">
                Wind Speed : {data?.wind?.speed} mph{" "}
              </li>
              <li className="list-group-item mx-3 mt-2 shadow-sm normaltxt">
                Weather Description :{" "}
                {data?.weather.map((elem) => elem.description)}{" "}
              </li>
              <li className="list-group-item mx-3 mt-2 shadow-sm normaltxt">
                SunRise : {currTime(data?.sys?.sunrise)}
              </li>
              <li className="list-group-item mx-3 mt-2 shadow-sm normaltxt">
                SunSet : {currTime(data?.sys?.sunset)}
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
