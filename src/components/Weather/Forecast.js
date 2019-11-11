import React, {useState, useEffect, useContext} from 'react';
import * as V from 'victory';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import {Cell, Grid} from "react-foundation";
import moment from 'moment';


import testWeatherData from '../../data/test-weather.json';
import {WeatherContext} from "../../contexts/weather";


const Forecast = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const weatherContext = useContext(WeatherContext);
  const [hourlyTemps, setHourlyTemps] = useState([]);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {
    if (weatherContext.forecast) {
      let temps = [];
      weatherContext.forecast.hourly.data.forEach((hour) => {
        const time = moment.unix(hour.time);
        const hourlyTemp = {x: new Date(time), y: hour.temperature}
        temps.push(hourlyTemp)
      });
      setHourlyTemps(temps);
    }
  }, [weatherContext.forecast ? weatherContext.forecast.hourly.data[0] : null]);


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