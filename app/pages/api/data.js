import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';

export const fetchWeatherData = async ({
  setFetchedData,
  searchMethod,
  cityInputText,
  country,
  unitOfMeasurement,
  location,
}) => {
  try {
    setFetchedData(true);
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // CHANGE THIS TO NON-PUBLIC IN PRODUCTION
    const url =
      searchMethod === 'city'
        ? `https://api.openweathermap.org/data/2.5/weather?q=${cityInputText},${country}&units=${unitOfMeasurement}&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat.toString()}&lon=${location.lon.toString()}&units=${unitOfMeasurement}&appid=${API_KEY}`;
    const response = await fetch(url); // fetches data from 3rd party api
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
