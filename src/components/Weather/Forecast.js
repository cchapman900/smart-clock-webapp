import React, {useState, useEffect} from 'react';
import * as V from 'victory';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import {Cell, Grid} from "react-foundation";


const Forecast = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const [hourlyTemps, setHourlyTemps] = useState([]);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  const updateWeather = () => {
    getHourlyWeatherForecast()
      .then((data) => {
        if (data) {
          let temps = [];
          data.list.forEach((hour) => {
            const hourlyTemp = {x: new Date(hour.dt_txt), y: hour.main.temp}
            temps.push(hourlyTemp)
          });
          setHourlyTemps(temps);
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

  const getHourlyWeatherForecast = async () => {
    const apiUri = `https://api.openweathermap.org/data/2.5/forecast?zip=${process.env.REACT_APP_ZIP_CODE}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`;
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


  /****************************************
   * STYLES
   ****************************************/

  const graphStyle = {
    'marginTop': '10px'
  };

  const lineChartStyle = {
    data: { stroke: "#c43a31" },
    parent: { border: "1px solid #ccc"}
  };


  /****************************************
   * RENDER METHODS
   ****************************************/

  const renderDaySummary = () => {
    return (
      <div>
        Monday
      </div>
    )
  };

  const render3DaySummary = () => {
    return (
      <Grid className={'text-center'}>
        <Cell small={4}>{renderDaySummary()}</Cell>
        <Cell small={4}>{renderDaySummary()}</Cell>
        <Cell small={4}>{renderDaySummary()}</Cell>
      </Grid>
    )
  };

  const renderTemperatureGraph = () => {
    if (hourlyTemps[0]) {
      return (
        <VictoryChart
          height={150}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            style={{
              data: {stroke: "#c43a31"},
              parent: {border: "1px solid #ccc"}
            }}
            interpolation="natural"
            data={hourlyTemps}
          />
        </VictoryChart>
      )
    }
  };

  return (
    <div style={graphStyle}>
      {/*{render3DaySummary()}*/}
      {renderTemperatureGraph()}
    </div>
  )
};

export default Forecast;