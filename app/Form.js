'use client';

import { useState } from 'react';

export default function Form() {
  const [displayText, setDisplayText] = useState('');
  const [searchMethod, setSearchMethod] = useState('city');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('standard');

  const handleTextDisplayChange = (e) => {
    setDisplayText(e.target.value);
  };

  const handleSelectionOfSearchMethod = (e) => {
    /* What should happen is that when a selection is made, by default the city and country should be showing,
       but if the user chooses "My Location," the input should shrink and then grab their location and display it as the value
     */
    e.preventDefault();
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

  /* IN CASE WE WANT TO GO BACK TO DROPDOWN FOR COUNTRY SELECTION - REMOVE BEFORE PRODUCTION
  const countryOptions = [
    {},
    {
      name: 'United States',
      code: 'US',
    },
    { name: 'United Kingdom', code: 'UK' },
  ];

  const populateSelect = () => {
    return countryOptions.map((country) => (
      <option key={country.code ? country.code : '0'} value={country.code}>
        {country.name}
      </option>
    ));
  };
   */

  return (
    <form className="form">
      <label htmlFor={'text-box'}>This is the label for the text-box</label>
      <input
        id="text-box"
        className="text-input"
        name="text-box"
        type="text"
        placeholder="Please enter your desired city"
        onChange={handleTextDisplayChange}
        value={displayText}
        required
      />
      {/*<select name="countries" id="countries">  REMOVE BEFORE PRODUCTION */}
      {/*   {populateSelect()}*/}
      {/* </select> */}
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
    </form>
  );
}
