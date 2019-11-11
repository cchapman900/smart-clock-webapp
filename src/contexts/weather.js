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
   * HTTP METHODS
   ****************************************/

  const getWeatherForecast = async () => {
    const apiUri = `http://192.168.0.121:3010/weather?lat=${process.env.REACT_APP_LAT}&long=${process.env.REACT_APP_LONG}`;
    console.log(apiUri);
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
    },600000);

    return () => {
      clearInterval(interval);
    };
  }, []);


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