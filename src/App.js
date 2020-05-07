import React from 'react';
import {Cell, Grid} from "react-foundation";

import './App.css';

import {WeatherContextProvider} from "./contexts/weather";

import ErrorBoundary from './ErrorBoundary'
import Weather from "./components/Weather/Weather";
import Clock from "./components/Clock/Clock";
import Zmanim from "./components/Events/Zmanim";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <WeatherContextProvider>
        <Grid style={{borderBottom: 'solid 1px'}}>
          <Cell small={8}>
            <Clock/>
          </Cell>
          <Cell small={4}>
            <Zmanim/>
          </Cell>
        </Grid>
        <Weather/>
        </WeatherContextProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
