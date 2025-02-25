import React from 'react';

const CardRightBack = ({ weatherData, handleFlip }) => {
  const date = new Intl.DateTimeFormat('default', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(weatherData.dt * 1000);

  const sunriseLocal = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(weatherData.sys.sunrise * 1000);

  const sunsetLocal = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(weatherData.sys.sunset * 1000);

  const sunriseUTC = new Intl.DateTimeFormat('default', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  }).format(weatherData.sys.sunrise * 1000);

  const sunsetUTC = new Intl.DateTimeFormat('default', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  }).format(weatherData.sys.sunset * 1000);

  return (
    <div id="cardRight" className="card" onClick={handleFlip}>
      <h1 className="date">{date}</h1>
      <h2 className="card-right-header">Local Time:</h2>
      <h3 className="card-right-info">Sunrise: {sunriseLocal}</h3>
      <h3 className="card-right-info">Sunset: {sunsetLocal}</h3>
      <h2 className="card-right-header">UTC Time:</h2>
      <h3 className="card-right-info">Sunrise: {sunriseUTC}</h3>
      <h3 className="card-right-info">Sunset: {sunsetUTC}</h3>
    </div>
  );
};

export default CardRightBack;
