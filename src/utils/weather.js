import React from 'react';

export const calculateFeelsLikeTemp = (temp, windSpeed = null, humidity = null) => {
  if (temp <= 50) {
    return calculateWindChill(temp, windSpeed)
  } else {
    return calculateHeatIndex(temp, humidity)
  }
};

const calculateWindChill = (temp, windSpeed) => {
  // https://www.weather.gov/media/epz/wxcalc/windChill.pdf
  return 35.74 + (0.6215 * temp) - (35.75 * Math.pow(windSpeed, .16)) + (0.4275 * temp * Math.pow(windSpeed, .16));
};

const calculateHeatIndex = (temp, humidity) => {
  // https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
  let heatIndex = -42.379 + (2.04901523 * temp) + (10.14333127 * humidity) - (.22475541 * temp * humidity) -
    (.00683783 * temp * temp) - (.05481717 * humidity * humidity) + (.00122874 * temp * temp * humidity) +
    (.00085282 * temp * humidity * humidity) - (.00000199 * temp * temp * humidity * humidity);
  if (temp < 80) {
    return 0.5 * (temp + 61.0 + ((temp-68.0)*1.2) + (humidity*0.094))
  }
  else if (humidity < 13) {
    return heatIndex - ((13 - humidity ) / 4) * Math.sqrt(((17 - Math.abs(temp-95.))/17));
  } else if (humidity > 85 && temp >= 80 && temp <= 87) {
    return heatIndex + ((humidity - 85) / 10) * ((87 - temp) / 5)
  }
  return heatIndex;

};

export const temperatureDisplay = (temp, showDegrees = true) => {
  let color;
  if (temp <= 0) {
    color = '#E5B8ED';
  } else if (temp > 0 && temp <= 10) {
    color = '#d2ceee';
  } else if (temp > 10 && temp <= 20) {
    color = '#c6d4ef';
  } else if (temp > 20 && temp <= 30) {
    color = '#ccdbf1';
  } else if (temp > 30 && temp <= 40) {
    color = '#B5DDF1'
  } else if (temp > 40 && temp <= 50) {
    color = '#B7EAF0';
  } else if (temp > 50 && temp <= 60) {
    color = '#B9F5B9';
  } else if (temp > 60 && temp <= 70) {
    color = '#D7F3B8';
  } else if (temp > 70 && temp <= 80) {
    color = '#F1E3BE';
  } else if (temp > 80 && temp <= 90) {
    color = '#EED5BB';
  } else if (temp > 90 && temp <= 100) {
    color = '#ECC2B8';
  } else {
    color = '#ECB8B8'
  }
  const style = {
    color: color
  };
  return (
    <span style={style}>{temp}{showDegrees ? '°' : ''}</span>
  )
};