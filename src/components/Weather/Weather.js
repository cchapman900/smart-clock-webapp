import React, {useState, useEffect} from 'react';
import * as V from 'victory';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import {Cell, Grid} from "react-foundation";
import Forecast from "./Forecast";
import CurrentWeather from "./CurrentWeather";


const Weather = () => {

  /****************************************
   * INITIALIZATION
   ****************************************/


  /****************************************
   * RENDER METHODS
   ****************************************/

  return (
    <Grid>
      <Cell small={5}>
        <CurrentWeather/>
      </Cell>
      <Cell small={7}>
        <Forecast/>
      </Cell>
    </Grid>
  )
};

export default Weather;