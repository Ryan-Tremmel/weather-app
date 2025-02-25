import '@/app/ui/styles/Card.scss';
import { TbTemperatureSun } from 'react-icons/tb';
import { TbTemperatureSnow } from 'react-icons/tb';
import { FaTemperatureArrowUp } from 'react-icons/fa6';
import { FaTemperatureArrowDown } from 'react-icons/fa6';
import { FaWind } from 'react-icons/fa6';
import { FaDroplet } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { PiMoneyWavyFill } from 'react-icons/pi';
import { PiUserSoundFill } from 'react-icons/pi';
import calcUnits from '@/app/lib/calcUnits';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/app/ui/skeletons';

export default function Card({
  data: { weatherData, countryData },
  cardType,
  unitOfMeasurement,
  screenWidth,
}) {
  // Based on the unit of measurement is selected, it will display the correct temperature and label, calculated using calcUnits
  const [unitsState, setUnitsState] = useState({
    temperature: {
      imperialLabel: 'Fahrenheit',
      imperialValue: undefined,
      metricLabel: 'Celsius',
      metricValue: undefined,
      standardLabel: 'Kelvin',
      standardValue: undefined,
    },
    temperatureFeelsLike: {
      imperialValue: undefined,
      metricValue: undefined,
      standardValue: undefined,
    },
    temperatureMin: {
      imperialValue: undefined,
      metricValue: undefined,
      standardValue: undefined,
    },
    temperatureMax: {
      imperialValue: undefined,
      metricValue: undefined,
      standardValue: undefined,
    },
    temperatureIsFreezing: undefined,
    windSpeed: {
      imperialLabel: 'miles/hour',
      imperialValue: undefined,
      metricLabel: 'meters/sec',
      metricValue: undefined,
    },
  });

  // Ensures calculations aren't rerun on ever re-render and ONLY when new weatherData is present
  useEffect(() => {
    if (weatherData) calcUnits(unitOfMeasurement, weatherData, setUnitsState);
  }, [weatherData]);

  if (weatherData) {
    switch (cardType) {
      case 'left':
        /***** BACK OF CARD *****/
        const {
          dt,
          timezone,
          sys: { sunrise, sunset },
        } = weatherData;

        // Formats date in UTC
        const date = new Intl.DateTimeFormat('en-US', {
          timeZone: 'UTC',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }).format(dt * 1000);

        // Corrects timezone formatting in the event the timezone given is a negative
        const timeZoneString = `Etc/GMT${timezone > 0 ? '-' : '+'}${Math.abs(timezone) / 3600}`;

        // Functions to format time
        const formatLocalTime = (timestamp) =>
          new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: timeZoneString,
          }).format(new Date(timestamp * 1000));

        // Used exclusively to compare times for the left-back card's image
        const formatLocalTime24Hours = (timestamp) =>
          new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            hour12: false,
            timeZone: timeZoneString,
          }).format(new Date(timestamp * 1000));

        // Gets local times
        const currentTimeLocal = formatLocalTime(Date.now() / 1000);
        const currentTimeLocal24Hours =
          formatLocalTime24Hours(Date.now() / 1000) * 1;
        const sunriseLocal = formatLocalTime(sunrise);
        const sunsetLocal = formatLocalTime(sunset);

        /***** FRONT OF CARD *****/
        let imagePathTimeOfDay;
        let imageTextColorClass;
        switch (true) {
          case currentTimeLocal24Hours >= 6 && currentTimeLocal24Hours <= 9:
            imagePathTimeOfDay = '/images/sunrise.jpeg';
            imageTextColorClass = 'card__text-color--dark';
            break;
          case currentTimeLocal24Hours >= 10 && currentTimeLocal24Hours <= 16:
            imagePathTimeOfDay = '/images/day.jpeg';
            imageTextColorClass = 'card__text-color--dark';
            break;
          case currentTimeLocal24Hours >= 17 && currentTimeLocal24Hours <= 20:
            imagePathTimeOfDay = '/images/sunset.jpeg';
            imageTextColorClass = 'card__text-color--white';
            break;
          case currentTimeLocal24Hours >= 21 || currentTimeLocal24Hours <= 5:
            imagePathTimeOfDay = '/images/night.jpeg';
            imageTextColorClass = 'card__text-time--night';
            break;
          default:
            imagePathTimeOfDay = '/images/midday.jpeg';
            break;
        }

        return (
          <div id="cardLeft" className="card">
            <div className="card__inner">
              <div className="card__front card__front-left color-text--primary">
                <p className="card__text--larger">
                  {unitsState.temperature[`${unitOfMeasurement}Value`]}°{' '}
                  {unitsState.temperature[`${unitOfMeasurement}Label`]}
                </p>
                <div className="card__front-left-group-div">
                  <div className="card__front-left-div">
                    {unitsState.temperatureIsFreezing ? (
                      <TbTemperatureSnow className="card__icon" />
                    ) : (
                      <TbTemperatureSun className="card__icon" />
                    )}
                    <p className="card__text">
                      Feels like{' '}
                      {
                        unitsState.temperatureFeelsLike[
                          `${unitOfMeasurement}Value`
                        ]
                      }
                      °
                    </p>
                  </div>
                  <div className="card__front-left-div">
                    <FaTemperatureArrowUp className="card__icon" />
                    <p className="card__text">
                      {unitsState.temperatureMax[`${unitOfMeasurement}Value`]}°
                    </p>
                  </div>
                  <div className="card__front-left-div">
                    <FaTemperatureArrowDown className="card__icon" />
                    <p className="card__text">
                      {unitsState.temperatureMin[`${unitOfMeasurement}Value`]}°
                    </p>
                  </div>
                  <div className="card__front-left-div">
                    <FaWind className="card__icon" />
                    <p className="card__text">
                      {unitsState.windSpeed[`${unitOfMeasurement}Value`]}{' '}
                      {unitsState.windSpeed[`${unitOfMeasurement}Label`]}
                    </p>
                  </div>
                  <div className="card__front-left-div">
                    <FaDroplet className="card__icon" />
                    <p className="card__text">
                      {weatherData.main.humidity}% humidity
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="card__back card__back-left"
                style={{
                  backgroundImage: `url(${imagePathTimeOfDay})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'bottom',
                  backgroundSize: 'cover',
                }}
              >
                <p className={`card__text-date ${imageTextColorClass}`}>
                  {date}
                </p>
                <div>
                  <p className={`card__label--larger ${imageTextColorClass}`}>
                    Local Time
                  </p>
                  <p className={`card__text-time ${imageTextColorClass}`}>
                    {currentTimeLocal}
                  </p>
                </div>
                <div>
                  <p className={`card__text--larger ${imageTextColorClass}`}>
                    Sunrise: {sunriseLocal}
                  </p>
                  <p className={`card__text--larger ${imageTextColorClass}`}>
                    Sunset: {sunsetLocal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'middle':
        /***** FRONT OF CARD *****/
        // Selects path of image for middle card based on weather
        const imageVarWeather = weatherData.weather[0].main;
        let imagePathWeather;
        switch (imageVarWeather) {
          case 'Clear':
            imagePathWeather = '/images/clear.jpeg';
            break;
          case 'Mist':
          case 'Haze':
            imagePathWeather = '/images/misty.jpeg';
            break;
          case 'Clouds':
            imagePathWeather = '/images/clouds.jpeg';
            break;
          case 'Rain':
            imagePathWeather = '/images/rain.jpeg';
            break;
          case 'Snow':
            imagePathWeather = '/images/snow.jpeg';
            break;
          default:
            imagePathWeather = '/images/clear.jpeg';
            break;
        }

        /***** BACK OF CARD *****/
        const weatherDesc = weatherData.weather[0].description
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' ');
        const icon = weatherData.weather[0].icon;
        const scale = screenWidth <= 1440 ? '2' : '4';
        const iconURL = `https://openweathermap.org/img/wn/${icon}@${scale}x.png`;
        return (
          <div id="cardMiddle" className="card">
            <div className="card__inner">
              <div
                className="card__front"
                style={{
                  backgroundImage: `url(${imagePathWeather})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
                <h3 className="card__text-color--dark-bold">
                  {weatherData.weather[0].main}
                </h3>
              </div>
              <div className="card__back">
                <img src={iconURL} alt={weatherDesc} />
                <p className="card__text card__text-weather-description">
                  {weatherDesc}
                </p>
              </div>
            </div>
          </div>
        );
      case 'right':
        const currencyCode = Object.keys(countryData.currencies);
        const languages = Object.values(countryData.languages).join(', ');

        return (
          <div id="cardRight" className="card">
            <div className="card__inner">
              <div className="card__front card__front-right">
                <div className="card__front-img-div">
                  <img
                    src={countryData.flags.png}
                    alt={countryData.flags.alt}
                    className="card__img"
                  />
                </div>
                <div className="card__front-text-div">
                  <p className="card__text card__text-country">
                    {countryData.name.official}
                  </p>
                  <p className="card__text">
                    Capital: {countryData.capital[0]}
                  </p>
                  <p className="card__text">{countryData.continents[0]}</p>
                </div>
              </div>
              <div className="card__back card__back-right">
                <div>
                  <MdPeopleAlt className="card__label" />
                  <p className="card__text">
                    {countryData.population.toLocaleString()}
                  </p>
                </div>
                <div>
                  <PiMoneyWavyFill className="card__label" />
                  <p className="card__text">
                    {countryData.currencies[currencyCode].name} (
                    {countryData.currencies[currencyCode].symbol})
                  </p>
                </div>
                <div>
                  <PiUserSoundFill className="card__label" />
                  <p className="card__text">{languages}</p>
                </div>
                <a
                  className="card__text card__link"
                  href={countryData.maps.googleMaps}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        );
    }
  } else return <LoadingSpinner />;
}
