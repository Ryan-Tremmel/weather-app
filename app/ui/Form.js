'use client';

import '@/app/ui/styles/Form.scss';
import { useState } from 'react';
import { fetchWeatherData } from '@/app/pages/api/data';
import useGeolocation from '@/app/lib/useGeolocation';
import countryOptions from '@/app/lib/countryOptions';

export default function Form({
  useLocation,
  setFetchedData,
  weatherData,
  setWeatherData,
  unitOfMeasurement,
  setUnitOfMeasurement,
}) {
  const [cityInputLabelText, setCityInputLabelText] = useState('');
  const [cityInputText, setCityInputText] = useState('');
  const [country, setCountry] = useState('');
  const [searchMethod, setSearchMethod] = useState('city');
  const [unitOfMeasurementActive, setUnitOfMeasurementActive] = useState(null);

  const { location, geolocationError } = useGeolocation(useLocation);

  // Ensures only letters are entered and not numbers
  const handleTextDisplayChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^A-Za-z]/g, '');
    setCityInputText(lettersOnly);
  };

  // Changes whether the API utilizes city or geolocation to retrieve weather data
  const handleSelectionOfSearchMethod = (e) => {
    /* What should happen is that when a selection is made, by default the city and country should be showing,
       but if the user chooses "My Location," the input should shrink and then grab their location and display it as the value
     */
    e.preventDefault();
    setSearchMethod(e.target.id);
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
    setWeatherData(await fetchWeatherData(formData));
  };

  // Maps through the countryOptions array with each country being an object with a name and country code, then displays as options
  const populateSelect = () => {
    // NEED TO ADD FALLBACK IF COUNTRY IS NOT LISTED
    return countryOptions.map((country) => (
      <option key={country.code ? country.code : '0'} value={country.code}>
        {country.name}
      </option>
    ));
  };

  // TESTING PURPOSES ONLY - REMOVE BEFORE PRODUCTION
  const logData = (e) => {
    e.preventDefault();
    console.log(weatherData);
  };

  return (
    <form className="form">
      <div className="form__section-top">
        <label htmlFor={'text-box'} className="form__text-label">
          Enter a city you'd like to see the current weather for or use your own
          location.
        </label>
        <input
          id="text-box"
          className="form__text-input"
          name="text-box"
          type="text"
          placeholder="Please enter your desired city"
          onChange={handleTextDisplayChange}
          value={cityInputText}
          required
        />
        <select
          name="countries"
          id="countries"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {populateSelect()}
        </select>
        <button onClick={handleFormSubmit}>Submit</button>
      </div>
      <div className="form__section-bottom">
        <button id="city" onClick={handleSelectionOfSearchMethod}>
          Get Weather for a City
        </button>
        <button id="geoLoc" onClick={handleSelectionOfSearchMethod}>
          Get Weather for my Location
        </button>
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
      <button onClick={logData}>Get Data</button>
    </form>
  );
}
