import React, {useState, useReducer, useEffect} from 'react';
import moment from 'moment';

import zmanimData from '../../data/zmanim'
import {Cell, Grid} from "react-foundation";
// import testSunData from "../../data/test-sun-data";
import MoonPhase from "./MoonPhase";

function eventReducer(state, action) {
  switch (action.type) {
    // Generated from a time
    case 'set_candleLighting':
      return [...state, {type: 'candleLighting', time: action.time}];
    // Provided from zmanim.json
    case 'set_yomTovEve':
      return [...state, {type: 'candleLighting', time: action.eventData.candleLighting}];
    case 'set_shabbosDay':
    case 'set_yomTovDay':
      return [...state, {type: 'nightfall', time: action.eventData.nightfall}];
    case 'set_omer':
      return [...state, {type: 'omer', day: action.eventData.day}];
    case 'set_cholHamoed':
      return [...state, {type: 'cholHamoed', name: action.eventData.name}]
    case 'set_chanukah':
      return [...state, {type: 'chanukah', candles: action.eventData.candles}]
    case 'set_purim':
      return [...state, {type: 'purim'}]
    case 'clear':
      return []
    default:
      throw new Error()
  }
}

function Zmanim(props) {

  /****************************************
   * INITIALIZATION
   ****************************************/

  const [nightfall, setNightfall] = useState(null);

  const [events, eventsDispatch] = useReducer(eventReducer, []);

  /****************************************
   * LIFECYCLE METHODS
   ****************************************/

  useEffect(() => {
    eventsDispatch({type: 'clear'})
    
    /** Date Override */
    const now = moment();
    // const now = moment("20211204", "YYYYMMDD")

    const today = now.format('Y-MM-DD');
    const dayOfWeek = now.format('dd');
    console.log(dayOfWeek)

    getSunData()
      .then((sunData) => {
        // Check if it's a Friday night
        if (dayOfWeek === 'Fr') {
          const candleLightingTime = getCandleLightingTime(sunData.results.sunset);
          eventsDispatch({type: 'set_candleLighting', time: candleLightingTime});
        }
        // Set nightfall
        const nightfallTime = moment.utc(sunData.results.civil_twilight_end).local();
        setNightfall(nightfallTime)
      });

    // If there's a record in the data, add it to the events state
    if (today in zmanimData) {
      zmanimData[today].forEach((event) => {
        const {type, ...eventData} = event;
        eventsDispatch({type: `set_${type}`, eventData});
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moment(props.date).format('Y-MM-DD')]);


  /****************************************
   * UTILITY METHODS
   ****************************************/

  /**
   * Calculate 18 minutes from sunset from a timestamp
   * @param sunset
   * @returns {string}
   */
  function getCandleLightingTime(sunset) {
    return moment.utc(sunset).local().subtract(18, 'minute').format('h:mm');
  }

  function getIsBeforeNightfall() {
    if (nightfall) {
      return moment.now() < nightfall
    }
  }


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
    marginTop: '70px',
    marginRight: '30px',
    textAlign: 'right'
  };

  const doubleContainerStyle = {
    marginBottom: '-170px'
  };

  const zmanimStyle = {
    marginTop: '30px',
  };

  const omerStyle = {
    marginTop: '-300px'
  };

  const eventTextStyle = {
    // lineHeight: '170%',
    fontSize: '70px'
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
      <Grid className={'text-center'} style={events.length > 1 ? doubleContainerStyle : {paddingTop: '40px', marginBottom: '-50px'}}>
        <Cell small={4}/>
        <Cell small={6} style={eventTextStyle}>
          <strong>{getIsBeforeNightfall() ? day - 1 : day}</strong>
          <img src={'/images/omer.svg'} alt={'omer'} style={omerStyle}/>
        </Cell>
      </Grid>
    )
  }

  function renderCholHamoed(name) {
    return (
      <Grid>
        <Cell small={2} style={eventTextStyle}/>
        <Cell small={7}>
          <img src={`/images/${name.toLowerCase()}.svg`} style={{}} alt={name.toLowerCase()}/>
        </Cell>
      </Grid>
    )
  }


  /**
   * @param {number} candles - How many candles will be lit in the evening
   * @returns 
   */
  function renderChanukah(candles) {
    const candlesToDisplay = getIsBeforeNightfall() ? candles : candles + 1;
    return (
      <Grid className={'text-center'} style={ events.length > 1 ? {marginTop: -50} : {} }>
        <Cell small={events.length > 1 ? 4 : 2} style={eventTextStyle}/>
        <Cell small={events.length > 1 ? 4 : 7}>
          <img src={`/images/chanukah-${candlesToDisplay}.svg`} alt={`Chanukah - ${candlesToDisplay} candles`}/>
        </Cell>
      </Grid>
    )
  }

  function renderPurim() {
    return (
      <Grid>
        <Cell small={2} style={eventTextStyle}/>
        <Cell small={7}>
          <img src={`/images/purim.svg`} alt='Purim'/>
        </Cell>
      </Grid>
    )
  }

  function renderEvent(event) {
    let eventContent;

    switch (event.type) {
      case 'candleLighting':
        eventContent = renderCandleLighting(event.time);
        break;
      case 'nightfall':
        eventContent = renderNightfall(event.time);
        break;
      case 'omer':
        eventContent = renderOmer(event.day);
        break;
      case 'cholHamoed':
        eventContent = renderCholHamoed(event.name);
        break;
      case 'chanukah':
        eventContent = renderChanukah(event.candles);
        break;
      case 'purim':
        eventContent = renderPurim();
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

  if (events && events.length > 0) {
    return renderEvents()
  } else {
    return <MoonPhase/>
  }
}

export default Zmanim;