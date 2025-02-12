'use client'; // Ensures it's only rendered on the client

import '@/app/ui/styles/_variables.scss';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import countryOptions from '@/app/lib/countryOptions';

export default function Dropdown({
  country,
  setCountry,
  searchMethod,
  isFocused,
  setIsFocused,
}) {
  // NEEDED FOR HYDRATION BUG WITH REACT-SELECT - CAN BE SAFELY REMOVED ONCE BUG IS FIXED
  // const Select = dynamic(() => import('react-select'), { ssr: false });

  const populateSelect = () => {
    return countryOptions.map((country) => ({
      key: country.code ? country.code : '0',
      value: country.code,
      label: country.name,
    }));
  };

  // Custom Control component to make it look like an input field
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      padding: '2px 10px',
      fontSize: '2.5rem',
      outline: 'none',
      width: 'max-content',
    }),
    menu: (provided) => ({
      ...provided,
      background: 'linear-gradient(to bottom right, #a6a6b7, #666675)',
      outline: 'none',
    }),
    input: (provided) => ({
      ...provided,
      color: '#97979b',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#97979b',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#cecee3' // Background color when selected
        : state.isFocused
          ? '#cecee3' // Background color when hovered
          : 'transparent',
      color: state.isSelected ? '#3d3d3d' : '#3d3d3d',
    }),
  };

  return (
    <div
      className={`input-dropdown-wrapper form__select ${searchMethod === 'geoLoc' ? 'disabled--input' : ''} ${isFocused ? 'form__input--focused' : ''}`}
    >
      <Select
        isDisabled={searchMethod === 'geoLoc'}
        options={populateSelect()}
        value={country}
        onChange={setCountry}
        placeholder="Select Country (Optional)"
        styles={customStyles}
        instanceId="country-select"
        isSearchable
        isClearable
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
