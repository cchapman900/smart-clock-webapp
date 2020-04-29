import React, {useState, useEffect} from 'react';
// import testWeatherData from "../data/test-weather";
import moment from 'moment';

export const WeatherContext = React.createContext({
  forecast: {},
  getIsDaytime: () => {}
});

export const WeatherContextProvider = props => {

  /*********************************************
   * INITIALIZATION
   *********************************************/
  const [forecast, setForecast] = useState(null);

  /****************************************
   * HTTP METHODS
   ****************************************/

  async function getWeatherForecast() {
    const apiUri = `http://192.168.0.121:3010/weather?lat=${process.env.REACT_APP_LAT}&long=${process.env.REACT_APP_LONG}`;
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
  }


  /****************************************
   * GETTER METHODS
   ****************************************/

  function getIsDaytime() {
    if (forecast) {
      const sunrise = moment.unix(forecast.daily.data[0].sunriseTime);
      const sunset = moment.unix(forecast.daily.data[0].sunsetTime);
      const now = moment.now();

      return (now > sunrise) && (now < sunset)
    }
  }


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
      forecast: forecast,
      getIsDaytime: getIsDaytime
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
};