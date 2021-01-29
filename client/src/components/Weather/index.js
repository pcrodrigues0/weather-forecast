import React, { useEffect } from "react";
import "./style.scss";

const Weather = props => {
  const symbol = "°C";

  const { handleSubmit } = props;

  useEffect(e => {
    handleSubmit(e);
  }, []);

  let tableBody;
  let weatherClassName = "weather weather--hidden";

  if (props.weather && props.weather.length) {
    weatherClassName = "weather";

    let condition = Math.round(props.weather[0].the_temp);
    let trClassName;
    if (condition < 5) {
      document.body.className = "snow";
      trClassName = "font-black";
    } else if (condition >= 5 && condition < 16) {
      document.body.className = "cold";
      trClassName = "font-white";
    } else {
      document.body.className = "warm";
      trClassName = "font-black";
    }

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let tableRows = props.weather.map(weather => {
      let day = new Date(weather.applicable_date);
      let dayString = days[day.getDay()];
      let min = Math.round(weather.min_temp);
      let max = Math.round(weather.max_temp);
      let currentTemp = Math.round(weather.the_temp);

      return (
        <tr className={trClassName} key={weather.id}>
          <td>
            <img
              alt="weather-icon"
              src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}
            />
          </td>
          <td>{dayString}</td>
          <td>{currentTemp}°</td>
          <td>{min}°</td>
          <td>{max}°</td>
          {/* <td>{weather.humidity}</td> */}
          <td>{Math.round(weather.wind_speed)}</td>
        </tr>
      );
    });

    tableBody = <tbody>{tableRows}</tbody>;
  }
  let loadingClassName =
    props.weather && props.weather.loading
      ? "loading"
      : "loading loading--hidden";

  let noResultsClassName =
    props.weather === undefined
      ? "no-results"
      : "no-results no-results--hidden";

  return (
    <div className="results-container">
      <div className={loadingClassName}/>
      <div className={noResultsClassName}>No Results Found.</div>
      <div className={weatherClassName}>
        <table>
          <thead>
            <tr>
              <th style={{ opacity: 0 }}>Icon</th>
              <th>Day</th>
              <th>
                Temp
                <br />
                {symbol}
              </th>
              <th>
                Low
                <br />
              </th>
              <th>
                High
                <br />
              </th>
              {/* <th>Humidity (%)</th> */}
              <th className="wind-speed">
                Wind
                <br />
                (mph)
              </th>
            </tr>
          </thead>
          {tableBody}
        </table>
      </div>
    </div>
  );
};

export default Weather;
