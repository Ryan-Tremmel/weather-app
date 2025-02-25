'use client'; // Ensures it's only rendered on the client

import '@/app/ui/styles/_variables.scss';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import countryOptions from '@/app/lib/countryOptions';

export default function DropdownCountries({
  country,
  setCountry,
  screenWidth,
}) {
  // NEEDED FOR HYDRATION BUG WITH REACT-SELECT (HOWEVER DOESN'T ALWAYS WORK) - CAN BE SAFELY REMOVED ONCE BUG IS FIXED
  // const Select = dynamic(() => import('react-select'), { ssr: false });

  const populateSelect = () => {
    return countryOptions.map((country) => ({
      key: country.code ? country.code : '0',
      value: country.code,
      label: country.name,
    }));
  };

  // Dynamically updates the dropdown UI for phones
  const backgroundColorVar = screenWidth > 485 ? 'transparent' : '#43434a';
  const borderVar = screenWidth > 485 ? 'none' : '0.35px solid #97979b';
  const fontSizeVar = screenWidth > 485 ? '2.5rem' : '1.8rem';
  const paddingVar = screenWidth > 485 ? '2px 10px' : '1px 10px';

  // Used to customize and stylize the dropdown
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '100px',
      boxShadow: 'none',
      fontSize: '2.5rem',
      padding: paddingVar,
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
    noOptionsMessage: (provided) => ({
      ...provided,
      color: '#3d3d3d',
    }),
  };

  return (
    <div className="input-dropdown-wrapper form__select-countries">
      <Select
        options={populateSelect()}
        value={country}
        onChange={setCountry}
        placeholder="Select Country (Optional)"
        styles={customStyles}
        instanceId="country-select"
        isSearchable
        isClearable
      />
    </div>
  );
}
