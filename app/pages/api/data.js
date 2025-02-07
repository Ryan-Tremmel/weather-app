import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';

export const fetchWeatherData = async ({
  cityInputText,
  country,
  unitOfMeasurement,
}) => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInputText},${country}&units=${unitOfMeasurement}&appid=${API_KEY}`,
    ); // fetches data from 3rd party api
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=33.90&lon=-83.88&appid=${API_KEY}`,
    // ); // fetches data from 3rd party api
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
