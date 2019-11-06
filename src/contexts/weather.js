import React, {useState, useEffect} from 'react';
import testWeatherData from "../data/test-weather";
import moment from "../components/Weather/Forecast";

export const WeatherContext = React.createContext({
  forecast: {}
});

export const WeatherContextProvider = props => {

  /*********************************************
   * INITIALIZATION
   *********************************************/
  const [forecast, setForecast] = useState(null);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {
    getWeatherForecast();
    setInterval(getWeatherForecast,1000)
  }, []);

  /****************************************
   * HTTP METHODS
   ****************************************/

  const getWeatherForecast = async () => {
    // const apiUri = `https://api.openweathermap.org/data/2.5/weather?zip=${process.env.REACT_APP_ZIP_CODE}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`;
    // return fetch(apiUri)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       return response.json()
    //     } else {
    //       console.error(`Could not fetch weather data. Got: ${response.status}`)
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
    setForecast(forecast + 1);
    console.log(forecast);
    return testWeatherData;
  };


  /*********************************************
   * CONTEXT PROVIDER
   *********************************************/

  return (
    <WeatherContext.Provider value={{
      forecast: forecast
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
};