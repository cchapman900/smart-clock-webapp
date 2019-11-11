import React, {useState, useEffect, useContext} from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryArea } from 'victory';
import {Cell, Grid} from "react-foundation";
import moment from 'moment';

import {WeatherContext} from "../../contexts/weather";

import {temperatureDisplay} from '../../utils/weather';

const Forecast = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const weatherContext = useContext(WeatherContext);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [hourlyPrecipProbability, setHourlyPrecipProbability] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [minWeeklyTemp, setMinWeeklyTemp] = useState(null);
  const [maxWeeklyTemp, setMaxWeeklyTemp] = useState(null);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {
    if (weatherContext.forecast) {
      const hours = parseInt(moment().format('k'));
      let temps = [];
      let precipProbs = [];

      for (let i = 0; i < hours; i++) {
        const time = moment().subtract(i, 'hour');
        const offetVal = {x: new Date(time), y: null};
        temps.push(offetVal);
        precipProbs.push(offetVal);
      }

      const hourlyData = weatherContext.forecast.hourly.data;

      hourlyData.splice(0 - (hours + 24));

      let minTemp = 200;
      let maxTemp = -100;

      hourlyData.forEach((hour) => {

        if (hour.temperature > maxTemp) {
          maxTemp = hour.temperature;
        }

        if (hour.temperature < minTemp) {
          minTemp = hour.temperature;
        }

        const time = moment.unix(hour.time);

        const hourlyTemp = {x: new Date(time), y: hour.temperature};
        temps.push(hourlyTemp);

        const hourlyPrecipProp = {x: new Date(time), y: hour.precipProbability};
        precipProbs.push(hourlyPrecipProp)
      });

      setMinWeeklyTemp(minTemp);
      setMaxWeeklyTemp(maxTemp);
      setHourlyTemps(temps)
      const normalizedPrecipProbs = precipProbs.map((prob) => {
        const newProb = prob.y * (maxTemp - minTemp) + minTemp;
        return {
          x: prob.x,
          y: prob.y === null ? null : newProb
        }
      });
      setHourlyPrecipProbability(normalizedPrecipProbs);
    }
  }, [weatherContext.forecast ? weatherContext.forecast.hourly.data[0] : null]);

  useEffect( () => {
    if (weatherContext.forecast) {
      let newDailyForecast = [];
      for (let i = 0; i < 6; i++) {
        const dailyWeather = weatherContext.forecast.daily.data[i];
        newDailyForecast.push(dailyWeather);
      }
      console.log(newDailyForecast);
      setDailyForecast(newDailyForecast);
    }
  }, [weatherContext.forecast ? weatherContext.forecast.daily.data[0] : null]);


  /****************************************
   * STYLES
   ****************************************/

  const graphStyle = {
    height: 120
  };

  const lineChartStyle = {
    data: { stroke: "#c43a31" },
    parent: { border: "1px solid #ccc"}
  };


  /****************************************
   * RENDER METHODS
   ****************************************/

  const renderDaySummary = (day) => {

    let precip = '0.00';
    let precipIcon;
    if (day.precipProbability > .1) {
      if (day.precipAccumulation) {
        precip = day.precipAccumulation
        precipIcon = <img width={40} src={`/images/weather-icons/wi-snowflake-cold.svg`} alt={'snow'}/>
      } else {
        precipIcon = <img width={40} src={`/images/weather-icons/wi-raindrops.svg`} alt={'rain'}/>
      }
    }

    return (
      <Grid style={{borderRight: 'solid .5px #666', borderBottom: 'solid .5px #666'}}>
        <Cell small={12}>
          {moment.unix(day.time).format('ddd')}
        </Cell>
        <Cell small={3}/>
        <Cell small={6}>
          <img src={`/images/weather-icons/${day.icon}.svg`}/>
        </Cell>
        <Cell small={3}/>
        <Cell>{temperatureDisplay(Math.round(day.temperatureHigh))} | {temperatureDisplay(Math.round(day.temperatureLow))}</Cell>
        {/*<Cell>*/}
        {/*  {precipIcon}{precip}"*/}
        {/*</Cell>*/}
      </Grid>
    )
  };

  const renderDaysSummary = () => {
    let daySummaries = [];
    dailyForecast.forEach((day) => {
      daySummaries.push(
        <Cell key={day.time} small={2}>{renderDaySummary(day)}</Cell>
      )
    });
    return (
      <Grid className={'text-center'}>
        {daySummaries}
      </Grid>
    )
  };

  const renderForecastGraph = () => {
    if (hourlyTemps[0]) {
      return (
        <VictoryChart
          height={150}
          theme={VictoryTheme.material}
          scale={{x: 'time'}}
          padding={{top:0, bottom: 80, left: 32}}
          domain={{y: [minWeeklyTemp || 0, maxWeeklyTemp || 100] }}
        >
          <VictoryArea
            style={{
              data: {stroke: '#8CABBD', fill: "#BADDF2"}
            }}
            interpolation="natural"
            data={hourlyPrecipProbability}
          />
          <VictoryLine
            style={{
              data: {stroke: "#FF9993", strokeWidth: 3}
            }}
            interpolation="natural"
            data={hourlyTemps}
          />
          <VictoryAxis
            dependentAxis
            tickCount={4}
            style={{
              tickLabels: {
                fill: 'white'
              }
            }}
          />
          <VictoryAxis
            crossAxis
            tickCount={5}
            tickFormat={() => ``}
            style={{
              tickLabels: {
                fill: 'white'
              }
            }}
          />
        </VictoryChart>
      )
    }
  };

  return (
    <div style={graphStyle}>
      <div style={{marginLeft: 50}}>
      {renderDaysSummary()}
      </div>
      {renderForecastGraph()}
    </div>
  )
};

export default Forecast;