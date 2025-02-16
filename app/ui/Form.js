'use client';

import '@/app/ui/styles/Form.scss';
import { useState } from 'react';
import Dropdown from '@/app/ui/Dropdown';
import { fetchWeatherData } from '@/app/pages/api/data';
import useGeolocation from '@/app/lib/useGeolocation';

export default function Form({
  useLocation,
  setFetchedData,
  data,
  setData,
  unitOfMeasurement,
  setUnitOfMeasurement,
  setError,
}) {
  const [cityInputText, setCityInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [country, setCountry] = useState('');
  const [searchMethod, setSearchMethod] = useState('city');
  const [unitOfMeasurementActive, setUnitOfMeasurementActive] = useState(null);
  const { location, geolocationError } = useGeolocation(useLocation);

  // Ensures only letters are entered and not numbers
  const handleTextDisplayChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setCityInputText(lettersOnly);
  };

  // Changes whether the API utilizes city or geolocation to retrieve weather data
  const handleSelectionOfSearchMethod = (e) => {
    /* What should happen is that when a selection is made, by default the city and country should be showing,
       but if the user chooses "My Location," the input should shrink and then grab their location and display it as the value
     */
    e.preventDefault();
    setSearchMethod(e.target.id);
    setCityInputText('');
    setCountry('');
  };

  // Selects the unit of measurement based on what the user selects
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
  };

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

    if (unitOfMeasurement !== 'imperial' && unitOfMeasurement !== 'metric')
      setUnitOfMeasurementActive('k');

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

  // Maps through the countryOptions array with each country being an object with a name and country code, then displays as options

  // const populateSelect = () => {
  //   // NEED TO ADD FALLBACK IF COUNTRY IS NOT LISTED
  //   return countryOptions.map((country) => ({
  //     key: country.code ? country.code : '0',
  //     value: country.code,
  //     label: country.name,
  //   }));
  // };

  /*const populateSelect = () => {
    // NEED TO ADD FALLBACK IF COUNTRY IS NOT LISTED
    return countryOptions.map((country) => (
      <option key={country.code ? country.code : '0'} value={country.code}>
        {country.name}
      </option>
    ));
  };*/

  return (
    <form className="form">
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
          required
          autoComplete="off"
          maxLength="50"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Dropdown
          country={country}
          setCountry={setCountry}
          searchMethod={searchMethod}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
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
          <button
            id="degree-selector--f"
            className={`btn-temp btn-temp--f ${unitOfMeasurementActive === 'f' ? 'btn-temp--f--active' : ''}`}
            onClick={handleUnitOfMeasurementChange}
          >
            Fahrenheit
          </button>
          <button
            id="degree-selector--c"
            className={`btn-temp btn-temp--c ${unitOfMeasurementActive === 'c' ? 'btn-temp--c--active' : ''}`}
            onClick={handleUnitOfMeasurementChange}
          >
            Celsius
          </button>
          <button
            id="degree-selector--k"
            className={`btn-temp btn-temp--k ${unitOfMeasurementActive === 'k' ? 'btn-temp--k--active' : ''}`}
            onClick={handleUnitOfMeasurementChange}
          >
            Kelvin
          </button>
        </div>
        <div className="form__section-bottom-submit">
          <submit className="btn btn-search" onClick={handleFormSubmit}>
            <p className="btn-search-text">Search</p>
            <ion-icon
              name="search"
              size="large"
              className="btn-search-icon"
            ></ion-icon>
          </submit>
        </div>
      </div>
    </form>
  );
}
