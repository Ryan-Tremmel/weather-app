'use client';

import '@/app/ui/styles/Form.scss';
import { useState } from 'react';
import Dropdown from '@/app/ui/Dropdown';
import Toggle from '@/app/ui/Toggle';
import { fetchWeatherData } from '@/app/api/data';
import useGeolocation from '@/app/lib/useGeolocation';

export default function Form({
  useLocation,
  setFetchedData,
  setData,
  unitOfMeasurement,
  setUnitOfMeasurement,
  setError,
  screenWidth,
}) {
  const [cityInputText, setCityInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [country, setCountry] = useState('');
  const [searchMethod, setSearchMethod] = useState('city');
  const [unitOfMeasurementActive, setUnitOfMeasurementActive] = useState(null); // FOR USE WITH UNIT OF MEASUREMENT BUTTONS
  const { location } = useGeolocation(useLocation);

  // Ensures only letters are entered and not numbers
  const handleTextDisplayChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setCityInputText(lettersOnly);
  };

  // Changes whether the API utilizes city or geolocation to retrieve weather data
  const handleSelectionOfSearchMethod = (e) => {
    e.preventDefault();
    setSearchMethod(e.target.id);
    setCityInputText('');
    setCountry('');
  };

  // Selects the unit of measurement based on what the user selects
  const handleUnitOfMeasurementChange = () => {
    setUnitOfMeasurement((prevUnit) =>
      prevUnit === 'imperial' ? 'metric' : 'imperial',
    );
  };
  /* FOR USE WITH UNIT OF MEASUREMENT BUTTONS
  const handleUnitOfMeasurementChange = (e) => {
    e.preventDefault();
    setUnitOfMeasurementActive(null);
    switch (e.target.id) {
      case 'degree-selector--f':
        setUnitOfMeasurement('imperial');
        setUnitOfMeasurementActive('f');
        break;
      case 'degree-selector--c':
        setUnitOfMeasurement('metric');
        setUnitOfMeasurementActive('c');
        break;
      default:
        setUnitOfMeasurement('standard');
        setUnitOfMeasurementActive('k');
    }
  }; */

  const formData = {
    setFetchedData,
    searchMethod,
    cityInputText,
    country,
    unitOfMeasurement,
    location,
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!location.lat) {
      setError('geolocation error');
      return;
    }

    /* FOR USE WITH UNIT OF MEASUREMENT BUTTONS
    // If no unit of measurement is selected, defaults to Kelvin (as is standard with Openweather)
    if (unitOfMeasurement !== 'imperial' && unitOfMeasurement !== 'metric')
      setUnitOfMeasurementActive('k'); */

    const { weatherData, countryData, error } =
      await fetchWeatherData(formData);

    if (error) {
      setError(error);
      setData((prevState) => ({
        ...prevState,
        weatherData: null,
        countryData: null,
      }));
      setCityInputText('');
      setCountry('');
    } else {
      setError(null);
      setData((prevState) => ({
        ...prevState,
        weatherData: weatherData,
        countryData: countryData[0],
      }));
    }
  };
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <div className="form__section-top">
        <label htmlFor={'text-box'} className="form__text-label">
          Enter a city you'd like to see the current weather for or use your own
          location.
        </label>
        <input
          id="text-box"
          className={`form__text-input ${searchMethod === 'geoLoc' ? 'disabled--input' : ''}
          ${isFocused ? 'form__input--focused' : ''}`}
          name="text-box"
          type="text"
          placeholder="Please enter your desired city"
          onChange={handleTextDisplayChange}
          value={cityInputText}
          autoComplete="off"
          maxLength="50"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleFormSubmit(e);
            }
          }}
        />
        <Dropdown
          country={country}
          setCountry={setCountry}
          searchMethod={searchMethod}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          screenWidth={screenWidth}
        />
      </div>
      <div className="form__section-bottom">
        <div className="form__section-bottom-method">
          <button
            id="city"
            className={`btn ${searchMethod === 'city' ? 'btn--active' : ''}`}
            onClick={handleSelectionOfSearchMethod}
          >
            Get Weather for a City
          </button>
          <button
            id="geoLoc"
            className={`btn ${searchMethod === 'geoLoc' ? 'btn--active' : ''}`}
            onClick={handleSelectionOfSearchMethod}
          >
            Get Weather for my Location
          </button>
        </div>
        <div className="form__section-bottom-units">
          <Toggle
            unitOfMeasurement={unitOfMeasurement}
            handleUnitOfMeasurementChange={handleUnitOfMeasurementChange}
          />
          {/* ALLOWS TO CHANGE UNIT OF MEASUREMENT WITH BUTTONS INSTEAD OF TOGGLE */}
          {/*<button*/}
          {/*  id="degree-selector--f"*/}
          {/*  className={`btn-temp btn-temp--f ${unitOfMeasurementActive === 'f' ? 'btn-temp--f--active' : ''}`}*/}
          {/*  onClick={handleUnitOfMeasurementChange}*/}
          {/*>*/}
          {/*  Fahrenheit*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  id="degree-selector--c"*/}
          {/*  className={`btn-temp btn-temp--c ${unitOfMeasurementActive === 'c' ? 'btn-temp--c--active' : ''}`}*/}
          {/*  onClick={handleUnitOfMeasurementChange}*/}
          {/*>*/}
          {/*  Celsius*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  id="degree-selector--k"*/}
          {/*  className={`btn-temp btn-temp--k ${unitOfMeasurementActive === 'k' ? 'btn-temp--k--active' : ''}`}*/}
          {/*  onClick={handleUnitOfMeasurementChange}*/}
          {/*>*/}
          {/*  Kelvin*/}
          {/*</button>*/}
        </div>
        <div className="form__section-bottom-submit">
          <button type="submit" className="btn btn-search">
            <p className="btn-search-text">Search</p>
            <ion-icon
              name="search"
              size="large"
              className="btn-search-icon"
            ></ion-icon>
          </button>
        </div>
      </div>
    </form>
  );
}
