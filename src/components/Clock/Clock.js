import React, {useState, useEffect} from 'react';
import { Textfit } from 'react-textfit';
import moment from 'moment';

const Clock = () => {
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setDate(Date.now())
    })
  }, []);

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
    'fontSize': '250px',
    'lineHeight': '80%'
  };

  /*******************************************
   * RENDER METHODS
   *******************************************/

  return (
    <div>
      <div style={dateStyle}>
        {moment(date).format('dddd | MMMM D, Y')}
      </div>
      <hr/>
      {/*<Textfit mode="single" max={1000} style={{'lineHeight': '80%'}}>*/}
      {/*  12:55*/}
      {/*</Textfit>*/}
      <div style={timeStyle}>
        {moment(date).format('h:mm')}
      </div>
    </div>
  )
};

export default Clock;