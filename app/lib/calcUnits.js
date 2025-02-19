export default function calcUnits(unit, weatherData, setUnitsState) {
  // Unit should be whatever the unitOfMeasurement is (imperial, metric, etc.)
  // Data should be the actual value of the weatherData

  function convertTemperature(unit) {
    const dataTempValue = weatherData.main.temp;
    const dataTempFeelsValue = weatherData.main.feels_like;
    const dataTempMinValue = weatherData.main.temp_min;
    const dataTempMaxValue = weatherData.main.temp_max;

    switch (unit) {
      case 'imperial':
        setUnitsState((prevState) => ({
          ...prevState,
          temperature: {
            ...prevState.temperature,
            imperialValue: dataTempValue.toFixed(1),
            metricValue: (((dataTempValue - 32) * 5) / 9).toFixed(1),
            standardValue: (((dataTempValue - 32) * 5) / 9 + 273.15).toFixed(1),
          },
          temperatureFeelsLike: {
            imperialValue: dataTempFeelsValue.toFixed(1),
            metricValue: (((dataTempFeelsValue - 32) * 5) / 9).toFixed(1),
            standardValue: (
              ((dataTempFeelsValue - 32) * 5) / 9 +
              273.15
            ).toFixed(1),
          },
          temperatureMin: {
            imperialValue: dataTempMinValue.toFixed(1),
            metricValue: (((dataTempMinValue - 32) * 5) / 9).toFixed(1),
            standardValue: (((dataTempMinValue - 32) * 5) / 9 + 273.15).toFixed(
              1,
            ),
          },
          temperatureMax: {
            imperialValue: dataTempMaxValue.toFixed(1),
            metricValue: (((dataTempMaxValue - 32) * 5) / 9).toFixed(1),
            standardValue: (((dataTempMaxValue - 32) * 5) / 9 + 273.15).toFixed(
              1,
            ),
          },
        }));
        break;
      case 'metric':
        setUnitsState((prevState) => ({
          ...prevState,
          temperature: {
            ...prevState.temperature,
            imperialValue: ((dataTempValue * 9) / 5 + 32).toFixed(1),
            metricValue: dataTempValue.toFixed(1),
            standardValue: (dataTempValue + 273.15).toFixed(1),
          },
          temperatureFeelsLike: {
            imperialValue: ((dataTempFeelsValue * 9) / 5 + 32).toFixed(1),
            metricValue: dataTempFeelsValue.toFixed(1),
            standardValue: (dataTempFeelsValue + 273.15).toFixed(1),
          },
          temperatureMin: {
            imperialValue: ((dataTempMinValue * 9) / 5 + 32).toFixed(1),
            metricValue: dataTempMinValue.toFixed(1),
            standardValue: (dataTempMinValue + 273.15).toFixed(1),
          },
          temperatureMax: {
            imperialValue: ((dataTempMaxValue * 9) / 5 + 32).toFixed(1),
            metricValue: dataTempMaxValue.toFixed(1),
            standardValue: (dataTempMaxValue + 273.15).toFixed(1),
          },
        }));
        break;
      case 'standard':
        setUnitsState((prevState) => ({
          ...prevState,
          temperature: {
            ...prevState.temperature,
            imperialValue: (((dataTempValue - 273.15) * 9) / 5 + 32).toFixed(1),
            metricValue: (dataTempValue - 273.15).toFixed(1),
            standardValue: dataTempValue.toFixed(1),
          },
          temperatureFeelsLike: {
            imperialValue: (
              ((dataTempFeelsValue - 273.15) * 9) / 5 +
              32
            ).toFixed(1),
            metricValue: (dataTempFeelsValue - 273.15).toFixed(1),
            standardValue: dataTempFeelsValue.toFixed(1),
          },
          temperatureMin: {
            imperialValue: (((dataTempMinValue - 273.15) * 9) / 5 + 32).toFixed(
              1,
            ),
            metricValue: (dataTempMinValue - 273.15).toFixed(1),
            standardValue: dataTempMinValue.toFixed(1),
          },
          temperatureMax: {
            imperialValue: (((dataTempMaxValue - 273.15) * 9) / 5 + 32).toFixed(
              1,
            ),
            metricValue: (dataTempMaxValue - 273.15).toFixed(1),
            standardValue: dataTempMaxValue.toFixed(1),
          },
        }));
        break;
    }
  }

  function convertSpeed(unit) {
    const dataWindSpeedValue = weatherData.wind.speed;

    if (dataWindSpeedValue <= 0) {
      setUnitsState((prevState) => ({
        ...prevState,
        windSpeed: {
          ...prevState.windSpeed,
          imperialValue: 0,
          metric: 0,
        },
      }));
      return;
    }
    switch (unit) {
      case 'imperial':
        setUnitsState((prevState) => ({
          ...prevState,
          windSpeed: {
            ...prevState.windSpeed,
            imperialValue: dataWindSpeedValue,
            metricValue: Math.trunc(dataWindSpeedValue * 0.44704),
          },
        }));
        break;
      case 'metric':
        setUnitsState((prevState) => ({
          ...prevState,
          windSpeed: {
            ...prevState.windSpeed,
            imperialValue: Math.trunc(dataWindSpeedValue / 0.44704),
            metricValue: dataWindSpeedValue,
          },
        }));
        break;
      default:
        setUnitsState((prevState) => ({
          ...prevState,
          windSpeed: {
            ...prevState.windSpeed,
            imperialValue: Math.trunc(dataWindSpeedValue / 0.44704),
            metricValue: dataWindSpeedValue,
          },
        }));
    }
  }
  convertTemperature(unit);
  convertSpeed(unit);
}
