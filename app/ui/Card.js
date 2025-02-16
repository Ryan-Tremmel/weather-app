import '@/app/ui/styles/Card.scss';
import { useState, useEffect } from 'react';
import calcUnits from '@/app/lib/calcUnits';
import { LoadingSpinner } from '@/app/ui/skeletons';

export default function Card({
  data: { weatherData, countryData },
  cardType,
  unitOfMeasurement,
}) {
  const [unitState, setUnitState] = useState({
    tempLabel: undefined,
    tempValue: undefined,
    windSpeedLabel: undefined,
    windSpeedValue: undefined,
  });

  // const calculatedUnits = calcUnits(unitOfMeasurement, weatherData);

  if (weatherData) {
    /* switch (unitOfMeasurement) {
       case 'imperial':
         setUnitState((prevState) => ({
           ...prevState,
           tempLabel: 'Fahrenheit',
           tempValue: calculatedUnits.fahrenheit,
           windSpeedLabel: 'miles/hour',
           windSpeedValue: calculatedUnits.windSpeed.imperial,
         }));
         break;
       case 'metric':
         setUnitState((prevState) => ({
           ...prevState,
           tempLabel: 'Celsius',
           tempValue: calculatedUnits.temperature.celsius,
           windSpeedLabel: 'meters/sec',
           windSpeedValue: calculatedUnits.windSpeed.metric,
         }));
         break;
       default:
         setUnitState((prevState) => ({
           ...prevState,
           tempLabel: 'Kelvin',
           tempValue: units.temperature.kelvin,
           windSpeedLabel: 'meters/sec',
           windSpeedValue: units.windSpeed.metric,
         })); */

    // Selects path of image for middle card based on weather
    const imageVar = weatherData.weather[0].main;
    let imagePath;
    switch (imageVar) {
      case 'Clear':
        imagePath = '/images/clear.jpeg';
        break;
      case 'Mist':
        imagePath = '/images/misty.jpeg';
        break;
      case 'Clouds':
        imagePath = '/images/clouds.jpeg';
        break;
      case 'Rain':
        imagePath = '/images/rain.jpeg';
        break;
      case 'Snow':
        imagePath = '/images/snow.jpeg';
        break;
      default:
        imagePath = '/images/clear.jpeg';
        break;
    }

    switch (cardType) {
      case 'left':
        return (
          <div id="cardLeft" className="card">
            <div className="card__inner">
              <div className="card__front">
                <p className="card__text">
                  {weatherData.main.temp}° {'TEMP'}
                </p>
                <p className="card__text">
                  Feels like {weatherData.main.feels_like}°
                </p>
              </div>
              <div className="card__back">
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
        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        return (
          <div id="cardMiddle" className="card">
            <div className="card__inner">
              <div
                className="card__front"
                style={{
                  backgroundImage: `url(${imagePath})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
                <h3 className="card__text-main">
                  {weatherData.weather[0].main}
                </h3>
              </div>
              <div className="card__back">
                <img src={iconURL} alt={weatherDesc} />
                <p className="card__text">{weatherDesc}</p>
                <p className="card__text">
                  Wind Speed: {weatherData.speed} {'TEMP'}
                </p>
              </div>
            </div>
          </div>
        );
      case 'right':
        return (
          <div id="cardRight" className="card">
            <div className="card__inner">
              <div className="card__front">
                <div className="card__front__img-div">
                  <img
                    src={countryData.flags.png}
                    alt={countryData.flags.alt}
                    className="card__img"
                  />
                </div>
              </div>
              <div className="card__back"></div>
            </div>
          </div>
        );
    }

    // switch (cardType) {
    //   case 'left':
    //     return (
    //       <div id="cardLeft" className="card">
    //         <div className="card__inner">
    //           <div className="card__front">
    //             <p className="card__text">
    //               {weatherData.main.temp}° {unit.temp}
    //             </p>
    //             <p className="card__text">
    //               Feels like {weatherData.main.feels_like}°
    //             </p>
    //           </div>
    //           <div className="card__back">
    //             <p className="card__text">
    //               Highest Temperature: {weatherData.main.temp_max}°
    //             </p>
    //             <p className="card__text">
    //               Lowest Temperature: {weatherData.main.temp_min}°
    //             </p>
    //             <p className="card__text">
    //               Humidity: {weatherData.main.humidity}%
    //             </p>
    //             <p className="card__text">
    //               Atmospheric Pressure: {weatherData.main.pressure} hPa
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   case 'middle':
    //     const weatherDesc = weatherData.weather[0].description
    //       .split(' ')
    //       .map((word) => word[0].toUpperCase() + word.slice(1))
    //       .join(' ');
    //     const icon = weatherData.weather[0].icon;
    //     const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    //     return (
    //       <div id="cardMiddle" className="card">
    //         <div className="card__inner">
    //           <div className="card__front">
    //             <p className="card__text">{weatherData.weather[0].main}</p>
    //           </div>
    //           <div className="card__back">
    //             <img src={iconURL} alt={weatherDesc} />
    //             <p className="card__text">{weatherDesc}</p>
    //             <p className="card__text">
    //               Wind Speed: {weatherData.wind.speed} {unit.speed}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   case 'right':
    //     return (
    //       <div id="cardRight" className="card">
    //         <div className="card__inner">
    //           <div className="card__front"></div>
    //           <div className="card__back"></div>
    //         </div>
    //       </div>
    //     );
    // }
  } else return <LoadingSpinner />;
}
