import React, {useState, useEffect, useContext} from 'react';
import {Cell, Grid} from "react-foundation";

import {WeatherContext} from "../../contexts/weather";

const MoonPhase = (props) => {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const weatherContext = useContext(WeatherContext);

  const [moonPhaseIcon, setMoonPhaseIcon] = useState(null);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect( () => {
    if (weatherContext.forecast) {
      const moonPhase = Math.round(weatherContext.forecast.daily.data[0].moonPhase * 27);
      console.log(moonPhase);
      setMoonPhaseIcon(moonPhase)
    }
  }, [weatherContext.forecast ? weatherContext.forecast.daily.data[0].time : null]);

  /*******************************************
   * STYLES
   *******************************************/

  const moonIcon = {
    marginTop: 75
  };

  const currentTempStyle = {
    'lineHeight': '80%',
    'fontSize': '150px',
    'marginBottom': '15px'
  };

  const feelsLikeTempTextStyle = {
    'verticalAlign': 'top',
    'fontSize': '24px'
  };

  const feelsLikeTempNumberStyle = {
    'lineHeight': '80%',
    'fontSize': '56px'
  };

  const imageStyle = {
    'display': 'block',
    'width': '100%',
    'height': 'auto'
  };

  /****************************************
   * RENDER METHODS
   ****************************************/

  console.log('moon');
  return (
    <Grid>
      <Cell small={3}/>
      <Cell small={6}>
        <img src={`/images/moon/${moonPhaseIcon}.svg`} style={moonIcon}/>
      </Cell>
    </Grid>
  )
};

export default MoonPhase;