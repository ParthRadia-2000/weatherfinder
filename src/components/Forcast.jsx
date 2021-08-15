import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const Forcast = ({ lat, lon }) => {
  const [option, setOption] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1, 2, 3, 4],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [1, 2, 3, 4],
    },
  ]);
  var data_array = [];
  var data_array_time = [];
  var temp_value = [];
  var temp_time = [];

  const setChart = () => {
    setOption({
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: temp_time.map((val, index) => val),
      },
    });
    setSeries([
      {
        name: "series-1",
        data: temp_value.map((val, index) => val),
      },
    ]);
  };

  const load_forcast = async () => {
    try {
      console.log(lat);
      const response_data = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=daily&appid=${process.env.REACT_APP_API_KEY}`
      );
      var res = await response_data.data;
      var length = response_data.data.hourly.length;
      for (let i = 0; i < length; i++) {
        data_array.push(res.hourly[i].temp);

        var timestamp = new Date(res.hourly[i].dt * 1000);
        var hh = timestamp.getHours();
        var h = hh;
        var min = ("0" + timestamp.getMinutes()).slice(-2);
        var ampm = "AM";
        if (hh > 12) {
          h = hh - 12;
          ampm = "PM";
        } else if (hh === 12) {
          h = 12;
          ampm = "PM";
        } else if (hh === 0) {
          h = 12;
        }
        var time = h + ":" + min + ampm;
        data_array_time.push(time);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    data_array.map(function (val, index) {
      temp_value.push(val);
    });
    console.log(temp_value);

    data_array_time.map(function (val, index) {
      temp_time.push(val);
    });
    console.log(temp_time);

    setChart();
  };

  useEffect(() => {
    load_forcast();
  }, [lon]);

  //var arr = [1, 2, 3, 4];

  return (
    <>
      <Chart id="chart" options={option} series={series} type="line" />
    </>
  );
};

export default Forcast;
