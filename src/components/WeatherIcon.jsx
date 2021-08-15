import React from "react";
import "./css/WeatherIcon.css";
const WeatherIcon = (props) => {
  return (
    <img
      src={`http://openweathermap.org/img/wn/${props.url}.png`}
      alt="Weather_Logo"
    />
  );
};

export default WeatherIcon;
