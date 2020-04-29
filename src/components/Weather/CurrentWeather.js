import React, {useState, useEffect, useContext} from 'react';
import {Cell, Grid} from "react-foundation";

// import testWeatherData from '../../data/test-weather.json'
import {WeatherContext} from "../../contexts/weather";
import {temperatureDisplay} from '../../utils/weather';

const CurrentWeather = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const weatherContext = useContext(WeatherContext);

  const [currentTemp, setCurrentTemp] = useState(null);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  // const [chanceOfPrecip, setChanceOfPrecip] = useState(null);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {
    if (weatherContext.forecast) {
      setCurrentTemp(Math.round(weatherContext.forecast.currently.temperature));
      setFeelsLikeTemp(Math.round(weatherContext.forecast.currently.apparentTemperature));
      setWeatherIcon(weatherContext.forecast.currently.icon)
      // setChanceOfPrecip(weatherContext.forecast.daily.data[0].precipProbability)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherContext.forecast]);

  /*******************************************
   * STYLES
   *******************************************/

  const currentWeatherStyle = {
    'marginTop': '20px'
  };

  const currentTempStyle = {
    'lineHeight': '80%',
    'fontSize': '160px',
    'marginBottom': '15px'
  };

  const feelsLikeTempTextStyle = {
    'verticalAlign': 'top',
    'fontSize': '24px',
    marginLeft: -10
  };

  const feelsLikeTempNumberStyle = {
    paddingLeft: 5,
    'lineHeight': '80%',
    'fontSize': '74px'
  };

  const imageStyle = {
    'display': 'block',
    'width': '100%',
    'height': 'auto'
  };

  /****************************************
   * RENDER METHODS
   ****************************************/


  const renderTemp = () => {
    return (
      <div>
        <Grid>
          <Cell style={currentTempStyle}>
            {currentTemp}°
          </Cell>
          <Cell style={{textAlign: 'left'}}>
            <span style={feelsLikeTempTextStyle}>feels like</span><span style={feelsLikeTempNumberStyle}>{temperatureDisplay(feelsLikeTemp)}</span>
          </Cell>
        </Grid>
      </div>
    )
  };

  const renderWeather = () => {
    return(
      <div>
        <img style={imageStyle} src={`/images/weather-icons/${weatherIcon}.svg`} alt={'weather icon'}/>
        {/*{Math.round(chanceOfPrecip * 100)}%*/}
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