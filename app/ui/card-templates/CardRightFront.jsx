import React from 'react';
import sunrise from './images/sunrise.jpeg';
import midday from './images/midday.jpeg';
import sunset from './images/sunset.jpg';
import night from './images/night.jpeg';

const CardRightFront = ({ handleFlip }) => {
  const now = new Date();

  const time = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(now);

  const timeImage = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
  }).format(now);

  let timeColor = 'white';
  let imageVar = timeImage;
  switch (true) {
    case imageVar >= 6 && imageVar <= 9:
      imageVar = sunrise;
      timeColor = 'black';
      break;
    case timeImage >= 10 && timeImage <= 16:
      imageVar = midday;
      timeColor = 'black';
      break;
    case timeImage >= 17 && timeImage <= 20:
      imageVar = sunset;
      timeColor = 'white';
      break;
    case timeImage >= 21 && timeImage <= 5:
      imageVar = night;
      timeColor = 'white';
      break;
    default:
      imageVar = night;
      break;
  }

  return (
    <div
      id="cardRight"
      className="card"
      onClick={handleFlip}
      style={{
        backgroundImage: `url(${imageVar})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <h1 style={{ color: timeColor, fontSize: '3rem' }}>{time}</h1>
    </div>
  );
};

export default CardRightFront;
