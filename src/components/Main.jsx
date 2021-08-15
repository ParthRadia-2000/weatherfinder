import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/main.css";
import "./css/TempInfo.css";
import "./css/header.css";
import "./css/Info-Right.css";
import Forcast from "./Forcast";
import WeatherIcon from "./WeatherIcon";
import { WiThermometer } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { VscLocation } from "react-icons/vsc";

const Main = () => {
  const [city, setCity] = useState("delhi"); // by default the given city is delhi
  const [temprature, setTemprature] = useState(0);
  const [maxtemp, setMaxTemp] = useState(0);
  const [mintemp, setMinTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState(0);
  const [weather_logo, setWeather_logo] = useState(" ");
  const [countery, setCountery] = useState(" ");
  const [latitude, setLatitude] = useState(28.6667); // By default latitude and longitude are given for delhi
  const [longitude, setLongitude] = useState(77.2167);

  const showData = async () => {
    const a = city;
    if (a === "") {
      alert("PLEASE ENTER CITY NAME");
    } else {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${a}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        );
        var res = await response.data;
        setLatitude(res.coord.lat);
        setLongitude(res.coord.lon);
        setCity(res.name);
        setCountery(res.sys.country);
        setWeather_logo(res.weather[0].icon);
        setTemprature(res.main.temp);
        setMaxTemp(res.main.temp_max);
        setMinTemp(res.main.temp_min);
        setHumidity(res.main.humidity);
        setPressure(res.main.pressure);
        setWind(res.wind.speed);
      } catch (error) {
        if (error.message === "Request failed with status code 404") {
          alert("PLEASE ENTER VALID CITY NAME");
          setCity("delhi");
        }
      }
    }
  };
  useEffect(() => {
    showData();
    return () => {
      /*cleanup*/
    };
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="city">
          <div className="city-name">
            <input
              type="text"
              placeholder="Location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <button
              className="find-button"
              onClick={() => {
                showData();
              }}
            >
              <span>SEARCH</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4" id="info-right">
            <div className="location">
              <div className="info-display">
                <div className="display-city">
                  <VscLocation />
                  <span>{city + "   " + countery}</span>
                </div>
                <div className="weather-status">
                  <WeatherIcon url={weather_logo} />
                </div>
                <div className="display">
                  <div className="temprature">
                    <div className="icon">
                      <WiThermometer />
                    </div>
                    <div className="value">
                      <span>{temprature}</span>
                    </div>
                    <div className="type">
                      <div className="max-title">
                        <span>Max T'C</span>
                      </div>
                      <div className="max-value">
                        <span>{maxtemp}</span>
                      </div>
                      <div className="min-title">
                        <span>Min T'C</span>
                      </div>
                      <div className="min-value">
                        <span>{mintemp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pressure">
                    <div className="icon">
                      <WiBarometer />
                    </div>
                    <div className="value">
                      <span>{pressure}</span>
                    </div>
                  </div>
                  <div className="humidity">
                    <div className="icon">
                      <WiHumidity />
                    </div>
                    <div className="value">
                      <span>{humidity}</span>
                    </div>
                  </div>
                  <div className="wind">
                    <div className="icon">
                      <WiStrongWind />
                    </div>
                    <div className="value">
                      <span>{wind}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="location-info"></div>
          </div>
          <div className="col-md-8" id="info-left">
            <Forcast lat={latitude} lon={longitude} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
