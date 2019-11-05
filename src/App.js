import React from 'react';
import './App.css';
import Weather from "./components/Weather/Weather";
import Clock from "./components/Clock/Clock";
import {Cell, Grid} from "react-foundation";
import Zmanim from "./components/Zmanim/Zmanim";

function App() {
  return (
    <div className="App">
      <Grid style={{borderBottom: 'solid 1px'}}>
        <Cell small={8}>
          <Clock/>
        </Cell>
        <Cell small={4}>
          <Zmanim/>
        </Cell>
      </Grid>
      <Weather/>
    </div>
  );
}

export default App;
