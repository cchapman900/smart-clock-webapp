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
    if (weatherContext.forecast && weatherContext.forecast.daily) {
      const moonPhase = Math.round(weatherContext.forecast.daily.data[0].moonPhase * 27);
      setMoonPhaseIcon(moonPhase)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherContext.forecast ? weatherContext.forecast.daily.data[0].time : null]);

  /*******************************************
   * STYLES
   *******************************************/

  const moonIcon = {
    marginTop: 75
  };

  /****************************************
   * RENDER METHODS
   ****************************************/

  return (
    <Grid>
      <Cell small={3}/>
      <Cell small={6}>
        <img src={`/images/moon/${moonPhaseIcon}.svg`} style={moonIcon} alt={'moon phase'}/>
      </Cell>
    </Grid>
  )
};

export default MoonPhase;