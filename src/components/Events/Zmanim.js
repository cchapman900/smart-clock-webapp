import React, {useState, useEffect, useContext} from 'react';
import moment from 'moment';

import zmanimData from '../../data/zmanim'
import {Cell, Grid} from "react-foundation";
// import testSunData from "../../data/test-sun-data";
import MoonPhase from "./MoonPhase";
import {WeatherContext} from "../../contexts/weather";

const Zmanim = () => {

  const weatherContext = useContext(WeatherContext);

  const [events, setEvents] = useState(null);

  useEffect(() => {
    const today = moment().format('Y-MM-DD');
    const dayOfWeek = moment().format('dd');
    // If there's a record, show it
    if (today in zmanimData) {
      setEvents(zmanimData[today]);
    }
    // Or check to just default check sunset
    else if (dayOfWeek === 'Fr') {
      setSunset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /****************************************
   * SETTER METHODS
   ****************************************/

  const setSunset = async () => {
    const sunData = await getSunData();
    if (sunData.status === 'OK') {
      console.log(sunData);
      const candleLighting = moment.utc(sunData.results.sunset).local().subtract(18, 'minute');
      setEvents({
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

  const containerStyle = {
    'marginTop': '100px',
    'marginRight': '30px',
    'textAlign': 'right'
  };

  const doubleContainerStyle = {
    'marginBottom': '-150px'
  };

  const zmanimStyle = {
    'marginTop': '30px',
  };

  const eventTextStyle = {
    'lineHeight': '170%',
    'fontSize': '70px'
  };

  /*******************************************
   * RENDER METHODS
   *******************************************/

  function renderCandleLighting(time) {
    return (
      <Grid>
        <Cell small={8} style={eventTextStyle}>
          {time}
        </Cell>
        <Cell small={4}>
          <img src={'/images/candle.svg'} alt={'candle'}/>
        </Cell>
      </Grid>
    )
  }

  function renderNightfall(time) {
    return (
      <Grid>
        <Cell small={8} style={eventTextStyle}>
          {time}
        </Cell>
        <Cell small={4}>
          <img src={'/images/weather-icons/wi-stars.svg'} alt={'stars'}/>
        </Cell>
      </Grid>
    )
  }

  function renderOmer(day) {
    return (
      <Grid className={'text-center'} style={events.length > 1 ? doubleContainerStyle : {marginBottom: '-50px'}}>
        <Cell small={4}/>
        <Cell small={6} style={eventTextStyle}>
          {weatherContext.getIsBeforeSunset() ? day - 1 : day}
          <img src={'/images/omer.svg'} alt={'omer'} style={{marginTop: '-330px'}}/>
        </Cell>
      </Grid>
    )
  }

  function renderEvent(event) {
    let eventContent = '';

    switch (event.type) {
      case 'shabbosEvening':
        eventContent = renderCandleLighting(event.candleLighting);
        break;
      case 'shabbosDay':
        eventContent = renderNightfall(event.nightfall);
        break;
      case 'omer':
        eventContent = renderOmer(event.day);
        break;
      default:
        eventContent = '';
    }

    return (
      <div key={event.type} style={zmanimStyle}>
        {eventContent}
      </div>
    )
  }

  function renderEvents() {
    const renderedEvents = (
      events.map((event) => {
        return renderEvent(event)
      })
    );

    return (
      <div style={containerStyle}>
        {renderedEvents}
      </div>
    )
  }

  if (events) {
    return renderEvents()
  } else {
    return <MoonPhase/>
  }
};

export default Zmanim;