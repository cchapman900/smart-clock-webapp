import React from 'react';
// import { Textfit } from 'react-textfit';
import moment from 'moment';

function Clock(props) {

  /*******************************************
   * STYLES
   *******************************************/

  const dateStyle = {
    'marginTop': '15px',
    'fontSize': '40px',
    'lineHeight': '80%'
  };

  const timeStyle = {
    'marginBottom': '30px',
    'fontSize': '220px',
    'lineHeight': '80%'
  };

  /*******************************************
   * RENDER METHODS
   *******************************************/

  return (
    <div>
      <div style={dateStyle}>
        {moment(props.date).format('dddd | MMMM D, Y')}
      </div>
      <hr/>
      {/*<Textfit mode="single" max={1000} style={{'lineHeight': '80%'}}>*/}
      {/*  12:55*/}
      {/*</Textfit>*/}
      <div style={timeStyle}>
        {moment(props.date).format('h:mm')}
      </div>
    </div>
  )
}

export default Clock;