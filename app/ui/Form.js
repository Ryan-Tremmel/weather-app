'use client';

import '@/app/ui/styles/Form.scss';
import { useState } from 'react';
import { fetchWeatherData } from '@/app/pages/api/data';
import countryOptions from '@/app/lib/countryOptions';

export default function Form({ weatherData, setWeatherData }) {
  const [cityInputText, setCityInputText] = useState('');
  const [country, setCountry] = useState('');
  const [searchMethod, setSearchMethod] = useState('city');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('standard');

  const handleTextDisplayChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^A-Za-z]/g, '');
    setCityInputText(lettersOnly);
  };

  const handleSelectionOfSearchMethod = (e) => {
    /* What should happen is that when a selection is made, by default the city and country should be showing,
       but if the user chooses "My Location," the input should shrink and then grab their location and display it as the value
     */
    e.preventDefault();
    console.log(countryOptions);
    setSearchMethod(e.target.id);
  };

  const handleUnitOfMeasurementChange = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case 'degree-selector--f':
        setUnitOfMeasurement('imperial');
        break;
      case 'degree-selector--c':
        setUnitOfMeasurement('metric');
        break;
      default:
        setUnitOfMeasurement('standard');
    }
  };

  const formData = {
    // NEED TO ADD COORDS IF GEOLOCATION
    cityInputText,
    country,
    unitOfMeasurement,
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setWeatherData(await fetchWeatherData(formData));
  };

  const populateSelect = () => {
    // NEED TO ADD FALLBACK IF COUNTRY IS NOT LISTED
    return countryOptions.map((country) => (
      <option key={country.code ? country.code : '0'} value={country.code}>
        {country.name}
      </option>
    ));
  };

  const logData = (e) => {
    e.preventDefault();
    console.log(weatherData);
  };

  return (
    <form className="form">
      <label htmlFor={'text-box'}>This is the label for the text-box</label>
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
      <button id="city" onClick={handleSelectionOfSearchMethod}>
        Get Weather for a City
      </button>
      <button id="geoLoc" onClick={handleSelectionOfSearchMethod}>
        Get Weather for my Location
      </button>
      <button id="degree-selector--f" onClick={handleUnitOfMeasurementChange}>
        Fahrenheit
      </button>
      <button id="degree-selector--c" onClick={handleUnitOfMeasurementChange}>
        Celsius
      </button>
      <button id="degree-selector--k" onClick={handleUnitOfMeasurementChange}>
        Kelvin
      </button>
      <button onClick={handleFormSubmit}>Submit</button>
      <button onClick={logData}>Get Data</button>
    </form>
  );
}
