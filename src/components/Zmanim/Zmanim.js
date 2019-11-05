import React, {useState, useEffect} from 'react';
import moment from 'moment';

import zmanimData from '../../data/zmanim.json'
import {Cell, Grid} from "react-foundation";

const Zmanim = () => {

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const today = moment(Date.now()).format('Y-MM-DD')
    if (today in zmanimData) {
      setEvent(zmanimData[today]);
    }
  }, []);

  /*******************************************
   * STYLES
   *******************************************/

  const zmanimStyle = {
    'marginTop': '80px',
    'marginRight': '30px',
    'textAlign': 'right'
  };

  const eventTextStyle = {
    'lineHeight': '150%',
    'fontSize': '60px'
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
          <img src={'/images/candle.svg'}/>
        </Cell>
      </Grid>
    )
  };

  const renderNighfall = () => {
    return (
      <Grid>
        <Cell small={8} style={eventTextStyle}>
          {event.nighfall}
        </Cell>
        <Cell small={4}>
          <img src={'/images/weather-icons/wi-stars.svg'}/>
        </Cell>
      </Grid>
    )
  };

  const renderShabbos = () => {
    return (
      <div>
        {renderCandleLighting()}
        {renderNighfall()}
      </div>
    )
  };

  const renderEvent = () => {
    let eventContent = '';

    if (event.type === 'shabbos') {
      eventContent = renderShabbos()
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
    return null
  }
};

export default Zmanim;