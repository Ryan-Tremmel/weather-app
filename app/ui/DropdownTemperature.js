'use client'; // Ensures it's only rendered on the client

import '@/app/ui/styles/_variables.scss';
import dynamic from 'next/dynamic';
import { TbTemperatureFahrenheit } from 'react-icons/tb';
import { TbTemperatureCelsius } from 'react-icons/tb';
import Select, { components } from 'react-select';

export default function DropdownTemperature({
  unitOfMeasurement,
  handleUnitOfMeasurementChange,
  screenWidth,
}) {
  // NEEDED FOR HYDRATION BUG WITH REACT-SELECT (HOWEVER DOESN'T ALWAYS WORK) - CAN BE SAFELY REMOVED ONCE BUG IS FIXED
  // const Select = dynamic(() => import('react-select'), { ssr: false });

  // Used to customize and stylize the dropdown
  const options = [
    { value: 'imperial', label: <TbTemperatureFahrenheit /> },
    { value: 'metric', label: <TbTemperatureCelsius /> },
  ];

  const SingleValue = ({ data, ...props }) => (
    <components.SingleValue {...props}>{data.label}</components.SingleValue>
  );

  let paddingVar;
  if (screenWidth > 1026) {
    paddingVar = '0.2rem 0.5rem 0.2rem 1rem';
  } else if (screenWidth < 1026 && screenWidth > 485) {
    paddingVar = '0.8rem 0.5rem 0.8rem 1.5rem';
  } else if (screenWidth <= 485) {
    paddingVar = '0.2rem 0.25rem 0.2rem 0.25rem';
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2e2e36',
      border: 'none',
      borderRight: '0.35px solid #97979b',
      borderRadius: '15px 0 0 15px',
      boxShadow: 'none',
      fontSize: '3.5rem',
      padding: paddingVar,
      outline: 'none',
      width: 'max-content',
    }),
    menu: (provided) => ({
      ...provided,
      background: 'linear-gradient(to bottom right, #a6a6b7, #666675)',
      borderRadius: '5px 5px 15px 15px',
      outline: 'none',
      overflow: 'hidden',
    }),
    input: (provided) => ({
      ...provided,
      color: '#97979b',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#97979b',
      display: 'flex',
      justifyContent: 'center',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#cecee3' // Background color when selected
        : state.isFocused
          ? '#b2b2c4' // Background color when hovered
          : 'transparent',
      color: state.isSelected ? '#3d3d3d' : '#3d3d3d',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }),
    indicatorSeparator: () => null,
  };

  return (
    <div className="input-dropdown-wrapper form__select">
      <Select
        defaultValue={options[0]}
        options={options}
        value={options.find((option) => option.value === unitOfMeasurement)}
        onChange={handleUnitOfMeasurementChange}
        styles={customStyles}
        instanceId="temperature-select"
        isClearable={false}
        isSearchable={false}
        components={{ SingleValue }}
      />
    </div>
  );
}
