import React, {useState, useEffect} from 'react';
import moment from 'moment';

import zmanimData from '../../data/zmanim'
import {Cell, Grid} from "react-foundation";
import testSunData from "../../data/test-sun-data";
import MoonPhase from "./MoonPhase";

const Zmanim = () => {

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const today = moment().format('Y-MM-DD');
    const dayOfWeek = moment().format('dd');
    // If there's a record, show it
    if (today in zmanimData) {
      setEvent(zmanimData[today]);
    }
    // Or check to just default check sunset
    else if (dayOfWeek === 'Fr') {
      setSunset()
    }
  }, []);

  /****************************************
   * SETTER METHODS
   ****************************************/

  const setSunset = async () => {
    const sunData = await getSunData();
    if (sunData.status === 'OK') {
      console.log(sunData);
      const candleLighting = moment.utc(sunData.results.sunset).local().subtract(18, 'minute');
      setEvent({
        type: 'shabbosEvening',
        candleLighting: candleLighting.format('h:mm')
      })
    }
  };

  /****************************************
   * HTTP METHODS
   ****************************************/

  const getSunData = async () => {
    const apiUri = `https://api.sunrise-sunset.org/json?lat=${process.env.REACT_APP_LAT}&lng=${process.env.REACT_APP_LONG}&formatted=0`;
    console.log(apiUri)
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
    // return testSunData;
  };

  /*******************************************
   * STYLES
   *******************************************/

  const zmanimStyle = {
    'marginTop': '100px',
    'marginRight': '30px',
    'textAlign': 'right'
  };

  const eventTextStyle = {
    'lineHeight': '170%',
    'fontSize': '70px'
  };

  /*******************************************
   * RENDER METHODS
   *******************************************/

  const renderCandleLighting = () => {
    return (
      <Grid>
        <Cell small={8} style={eventTextStyle}>
          {event.candleLighting}
        </Cell>
        <Cell small={4}>
          <img src={'/images/candle.svg'} alt={'candle'}/>
        </Cell>
      </Grid>
    )
  };

  const renderNightfall = () => {
    return (
      <Grid>
        <Cell small={8} style={eventTextStyle}>
          {event.nightfall}
        </Cell>
        <Cell small={4}>
          <img src={'/images/weather-icons/wi-stars.svg'} alt={'stars'}/>
        </Cell>
      </Grid>
    )
  };

  const renderEvent = () => {
    let eventContent = '';

    if (event.type.includes('shabbosEvening')) {
      eventContent = renderCandleLighting()
    } else if (event.type.includes('shabbosDay')) {
      eventContent = renderNightfall()
    }

    return (
      <div style={zmanimStyle}>
        {eventContent}
      </div>
    )
  };

  if (event) {
    return renderEvent()
  } else {
    return <MoonPhase/>
  }
};

export default Zmanim;