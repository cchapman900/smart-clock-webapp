import React, {useState, useEffect} from 'react';
import {Cell, Grid} from "react-foundation";
import Forecast from "./Forecast";
import CurrentWeather from "./CurrentWeather";
import testWeatherData from "../../data/test-weather";


const Weather = () => {

  /****************************************
   * HTTP METHODS
   ****************************************/

  const getWeatherForecast = async () => {
    const apiUri = `http://localhost:3001/weather?lat=${process.env.REACT_APP_LAT}&long=${process.env.REACT_APP_LONG}`;
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
    // return testWeatherData;
  };

  /*********************************************
   * INITIALIZATION
   *********************************************/
  const initialForecast = async () => await getWeatherForecast();
  const [forecast, setForecast] = useState(initialForecast);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {

    const getInitialForecast = async () => {
      const initialForecast = await getWeatherForecast();
      setForecast(initialForecast)
    };
    getInitialForecast();

    const interval = setInterval(async () => {
      const updatedForecast = await getWeatherForecast();
      setForecast(updatedForecast);
    },180000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /****************************************
   * RENDER METHODS
   ****************************************/

  return (
    <Grid>
      <Cell small={5}>
        <CurrentWeather forecast={forecast}/>
      </Cell>
      <Cell small={7}>
        <Forecast forecast={forecast}/>
      </Cell>
    </Grid>
  )
};

export default Weather;