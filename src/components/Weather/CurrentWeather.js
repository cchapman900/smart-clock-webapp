import React, {useState, useEffect} from 'react';
import {Cell, Grid} from "react-foundation";

import {calculateFeelsLikeTemp} from '../../utils/weather';
import testWeatherData from '../../data/test-weather.json'
import {WeatherContext} from "../../contexts/weather";

const CurrentWeather = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const [forecast, setForecast] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {
    if (props.forecast.currently) {
      setCurrentTemp(Math.round(props.forecast.currently.temperature))
      setFeelsLikeTemp(Math.round(props.forecast.currently.apparentTemperature))
      setWeatherIcon(props.forecast.currently.icon)
    }
  }, [props.forecast]);

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