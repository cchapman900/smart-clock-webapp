import React, {useState, useEffect} from 'react';
import {Cell, Grid} from "react-foundation";

import {calculateFeelsLikeTemp} from '../../utils/weather';

const CurrentWeather = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const [currentTemp, setCurrentTemp] = useState(null);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  const updateWeather = () => {
    getDailyWeatherForecast()
      .then((data) => {
        // console.log(data)
        if (data) {
          setCurrentTemp(Math.round(data.main.temp));
          setFeelsLikeTemp(Math.round(calculateFeelsLikeTemp(data.main.temp, data.wind.speed, data.main.humidity)));
          setWeatherIcon(data.weather[0].icon);
        }
      })
  };

  useEffect( () => {
    updateWeather();
    setInterval(updateWeather,600000)
  }, []);

  /****************************************
   * HTTP METHODS
   ****************************************/

  const getDailyWeatherForecast = async () => {
    const apiUri = `https://api.openweathermap.org/data/2.5/weather?zip=${process.env.REACT_APP_ZIP_CODE}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`;
    return fetch(apiUri)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          console.error(`Could not fetch weather data. Got: ${response.status}`)
        }
      })
      .catch(error => {
        console.error(error)
      })
  };

  /*******************************************
   * STYLES
   *******************************************/

  const currentWeatherStyle = {
    'marginTop': '20px'
  };

  const currentTempStyle = {
    'lineHeight': '80%',
    'fontSize': '150px',
    'marginBottom': '15px'
  };

  const feelsLikeTempTextStyle = {
    'verticalAlign': 'top',
    'fontSize': '24px'
  };

  const feelsLikeTempNumberStyle = {
    'lineHeight': '80%',
    'fontSize': '56px'
  };

  const imageStyle = {
    'display': 'block',
    'width': '100%',
    'height': 'auto'
  };

  /****************************************
   * RENDER METHODS
   ****************************************/

  const renderTempFormat = (temp) => {
    return (
      <span>{temp}&#176;</span>
    )
  };

  const renderTemp = () => {
    return (
      <div>
        <Grid>
          <Cell style={currentTempStyle}>
            {renderTempFormat(currentTemp)}
          </Cell>
          <Cell style={{textAlign: 'left'}}>
            <span style={feelsLikeTempTextStyle}>feels like</span><span style={feelsLikeTempNumberStyle}> {renderTempFormat(feelsLikeTemp)}</span>
          </Cell>
        </Grid>
      </div>
    )
  };

  const renderWeather = () => {
    return(
      <div>
        <img style={imageStyle} src={`/images/weather-icons/${weatherIcon}.svg`}/>
      </div>
    )
  };

  return (
    <Grid style={currentWeatherStyle}>
      <Cell small={5}>
        {renderWeather()}
      </Cell>
      <Cell small={7}>
        {renderTemp()}
      </Cell>
    </Grid>
  )
};

export default CurrentWeather;