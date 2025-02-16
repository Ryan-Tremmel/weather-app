import { log } from 'next/dist/server/typescript/utils';

export default function calcUnits(unit, weatherData) {
  // Unit should be whatever the unitOfMeasurement is (imperial, metric, etc.)
  // Data should be the actual value of the weatherData
  const dataTempValue = weatherData.main.temp;
  const dataWindSpeedValue = weatherData.wind.speed;
  console.log(dataTempValue, dataWindSpeedValue);

  const calculatedUnits = {
    temperature: {
      fahrenheit: undefined,
      celsius: undefined,
      kelvin: undefined,
    },
    temperatureFeelsLike: {
      fahrenheit: undefined,
      celsius: undefined,
      kelvin: undefined,
    },
    temperatureMin: {
      fahrenheit: undefined,
      celsius: undefined,
      kelvin: undefined,
    },
    temperatureMax: {
      fahrenheit: undefined,
      celsius: undefined,
      kelvin: undefined,
    },
    windSpeed: {
      imperial: undefined,
      metric: undefined,
    },
  };

  function convertTemperature(unit, dataTempValue) {
    switch (unit) {
      case 'imperial':
        calculatedUnits.temperature.fahrenheit = dataTempValue;
        calculatedUnits.temperature.celsius = (
          ((dataTempValue - 32) * 5) /
          9
        ).toFixed(2); // Convert Fahrenheit to Celsius
        calculatedUnits.temperature.kelvin = (
          ((dataTempValue - 32) * 5) / 9 +
          273.15
        ).toFixed(2); // Fahrenheit to Kelvin
        break;
      case 'metric':
        calculatedUnits.temperature.fahrenheit = (
          (dataTempValue * 9) / 5 +
          32
        ).toFixed(2); // Convert Celsius to Fahrenheit
        calculatedUnits.temperature.celsius = dataTempValue;
        calculatedUnits.temperature.kelvin = (dataTempValue + 273.15).toFixed(
          2,
        ); // Celsius to Kelvin
        break;
      case 'standard':
        calculatedUnits.temperature.fahrenheit = (
          ((dataTempValue - 273.15) * 9) / 5 +
          32
        ).toFixed(2);
        calculatedUnits.temperature.celsius = (dataTempValue - 273.15).toFixed(
          2,
        );
        calculatedUnits.temperature.kelvin = dataTempValue;
        break;
    }
  }

  function convertSpeed(unit, dataWindSpeedValue) {
    if (dataWindSpeedValue <= 0) {
      calculatedUnits.windSpeed.imperial = calculatedUnits.windSpeed.metric = 0;
      return;
    }
    switch (unit) {
      case 'imperial':
        calculatedUnits.windSpeed.imperial = dataWindSpeedValue;
        calculatedUnits.windSpeed.celsius = (
          dataWindSpeedValue * 0.44704
        ).toFixed(2);
        break;
      case 'metric':
        calculatedUnits.windSpeed.imperial = (
          dataWindSpeedValue / 0.44704
        ).toFixed(2);
        calculatedUnits.windSpeed.metric = dataWindSpeedValue;
        break;
      default:
        calculatedUnits.windSpeed.imperial = (
          dataWindSpeedValue / 0.44704
        ).toFixed(2);
        calculatedUnits.windSpeed.metric = dataWindSpeedValue;
    }
  }
  convertTemperature(unit, dataTempValue);
  convertSpeed(unit, dataWindSpeedValue);
  console.log(calculatedUnits);
  return calculatedUnits;
}
