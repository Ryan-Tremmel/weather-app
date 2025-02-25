'use client';

import '@/app/ui/styles/Form.scss';
import libraries from '@/app/lib/googleApiLib';
import { useState, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';
import { MdLocationOff } from 'react-icons/md';
import DropdownTemperature from '@/app/ui/DropdownTemperature';
import DropdownCountries from '@/app/ui/DropdownCountries';
import { fetchWeatherData } from '@/app/api/data';
import useGeolocation from '@/app/lib/useGeolocation';
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from '@react-google-maps/api';

export default function Form({
  useLocation,
  setFetchedData,
  setData,
  unitOfMeasurement,
  setUnitOfMeasurement,
  setError,
  screenWidth,
}) {
  const inputRef = useRef(null);
  const [cityInputText, setCityInputText] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [searchMethod, setSearchMethod] = useState('city');
  const { location, geolocationError } = useGeolocation(useLocation);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  // Ensures only letters are entered and not numbers
  const handleTextDisplayChange = (e) => {
    // If a user types in the text box, it sets the search method to city
    if (searchMethod !== 'city') setSearchMethod('city');
    const lettersOnly = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setCityInputText(lettersOnly);
    setCity(lettersOnly);
  };

  // Handles state updates when using Google Maps Autocomplete API
  const handleOnPlaceChanged = () => {
    let address = inputRef.current.getPlace();
    let arrPos = address.address_components.length - 1;
    if (
      /\d/.test(
        address.address_components[address.address_components.length - 1]
          ?.short_name,
      )
    ) {
      // If the last element has numbers, use the second-to-last position
      arrPos = address.address_components.length - 2;
    } else {
      // If the last element doesn't have numbers, use the last position
      arrPos = address.address_components.length - 1;
    }

    setCityInputText(address.formatted_address);
    setCity(address.address_components[0].long_name);
    setCountry(address.address_components[arrPos].short_name);
  };

  // Changes whether the API utilizes city or geolocation to retrieve weather data
  const handleSelectionOfSearchMethod = (e) => {
    e.preventDefault();
    setSearchMethod(e.target.id);
    setCity('');
    setCityInputText('');
    setCountry('');
  };

  // Selects the unit of measurement based on what the user selects
  const handleUnitOfMeasurementChange = (e) => {
    console.log(e.value);
    setUnitOfMeasurement(e.value);
  };

  const formData = {
    setFetchedData,
    isLoaded,
    searchMethod,
    city,
    country,
    unitOfMeasurement,
    location,
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setData({ weatherData: null, countryData: null });
    setError(null);

    // If there was an issue grabbing coordinates because geolocation couldn't be found AND it was NOT denied
    if (!location.lat && geolocationError !== 'User denied Geolocation') {
      setError('geolocation error');
      return;
    }

    // If geolocation was denied by the user
    if (
      searchMethod === 'geoLoc' &&
      geolocationError === 'User denied Geolocation'
    ) {
      setFetchedData(false); // Removes previous cards from weatherData section
      setError('geolocation error');
      return;
    }

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
      <div className="form__container">
        <DropdownTemperature
          unitOfMeasurement={unitOfMeasurement}
          handleUnitOfMeasurementChange={handleUnitOfMeasurementChange}
          screenWidth={screenWidth}
        />
        <div className="form__text-input-wrapper">
          {isLoaded && (
            <Autocomplete
              className="form__autocomplete"
              onLoad={(ref) => (inputRef.current = ref)}
              onPlaceChanged={handleOnPlaceChanged}
              options={{
                types: ['(cities)'],
              }}
            >
              <input
                name="input-text"
                type="text"
                value={cityInputText}
                maxLength="50"
                className="form__text-input"
                placeholder="Atlanta, GA"
                onChange={handleTextDisplayChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFormSubmit(e);
                  }
                }}
              />
            </Autocomplete>
          )}
        </div>
        {isLoaded ? null : (
          <input
            name="input-text"
            type="text"
            value={cityInputText}
            maxLength="50"
            className="form__text-input"
            placeholder="Atlanta"
            onChange={handleTextDisplayChange}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
          />
        )}
        <button
          id="geoLoc"
          className={`form__geolocation ${!geolocationError ? '' : 'disabled--input'}`}
          onClick={handleSelectionOfSearchMethod}
        >
          {!geolocationError ? (
            <MdLocationOn
              className={`form__geolocation-icon ${searchMethod === 'city' ? '' : 'form__geolocation-icon--active'}`}
            />
          ) : (
            <MdLocationOff className="form__geolocation-icon" />
          )}
        </button>
        {isLoaded ? null : (
          <DropdownCountries
            country={country}
            setCountry={setCountry}
            screenWidth={screenWidth}
          />
        )}
        <button type="submit" className="btn-search">
          <IoSearch className="btn-search-icon" />
        </button>
      </div>
      <div className="form__label">
        <MdLocationOn className="form__label-icon" />
        <p className="form__label-text">Use my location</p>
      </div>
    </form>
  );
}
