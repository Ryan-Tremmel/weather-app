'use client'; // Ensures it's only rendered on the client

import '@/app/ui/styles/_variables.scss';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import countryOptions from '@/app/lib/countryOptions';

export default function Dropdown({ country, setCountry, searchMethod }) {
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
      // height: '40px'
      backgroundColor: 'transparent',
      border: 'none',
      padding: '2px 10px',
      fontSize: '2.5rem',
      width: 'max-content',
    }),
    input: (provided) => ({
      ...provided,
      color: '$color-primary',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '$color-primary',
    }),
  };

  return (
    <div
      className={`input-dropdown-wrapper form__select ${searchMethod === 'geoLoc' ? 'disabled' : ''}`}
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
      />
    </div>
  );
}
