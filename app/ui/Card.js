import '@/app/ui/styles/Card.scss';
import React from 'react';
import { LoadingSpinner } from '@/app/ui/skeletons';

export default function Card({ weatherData, cardType, unitOfMeasurement }) {
  if (weatherData) {
    const unit = {
      tempValue: null,
      speedValue: null,
    };

    switch (unitOfMeasurement) {
      case 'imperial':
        unit.tempLabel = 'Fahrenheit';
        unit.tempValue = 0;
        unit.speedLabel = 'miles/hour';
        unit.speedValue = 0;
        break;
      case 'metric':
        unit.tempLabel = 'Celsius';
        unit.tempValue = 0;
        unit.speedLabel = 'meters/sec';
        unit.speedValue = 0;
        break;
      default:
        unit.temp = 'Celsius';
        unit.tempValue = 0;
        unit.speed = 'meters/sec';
        unit.speedValue = 0;
    }

    switch (cardType) {
      case 'left':
        return (
          <div id="cardLeft" className="card">
            <div className="card__inner">
              <div className="card--front">
                <p className="card__text">
                  {weatherData.main.temp}° {unit.temp}
                </p>
                <p className="card__text">
                  Feels like {weatherData.main.feels_like}°
                </p>
              </div>
              <div className="card--back">
                <p className="card__text">
                  Highest Temperature: {weatherData.main.temp_max}°
                </p>
                <p className="card__text">
                  Lowest Temperature: {weatherData.main.temp_min}°
                </p>
                <p className="card__text">
                  Humidity: {weatherData.main.humidity}%
                </p>
                <p className="card__text">
                  Atmospheric Pressure: {weatherData.main.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        );
      case 'middle':
        const weatherDesc = weatherData.weather[0].description
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' ');
        const icon = weatherData.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        return (
          <div id="cardMiddle" className="card">
            <div className="card__inner">
              <div className="card--front">
                <p className="card__text">{weatherData.weather[0].main}</p>
              </div>
              <div className="card--back">
                <img src={iconURL} alt={weatherDesc} />
                <p className="card__text">{weatherDesc}</p>
                <p className="card__text">
                  Wind Speed: {weatherData.wind.speed} {unit.speed}
                </p>
              </div>
            </div>
          </div>
        );
      case 'right':
        return (
          <div id="cardRight" className="card">
            <div className="card__inner">
              <div className="card--front"></div>
              <div className="card--back"></div>
            </div>
          </div>
        );
    }
  } else return <LoadingSpinner />;
}
