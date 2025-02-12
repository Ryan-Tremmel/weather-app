import eliminateSpace from '@/app/lib/eliminateSpace';

export const fetchWeatherData = async ({
  setFetchedData,
  searchMethod,
  cityInputText,
  country,
  unitOfMeasurement,
  location,
}) => {
  try {
    // Eliminates extra space in city (las    vegas to las vegas)
    const city = eliminateSpace(cityInputText);
    console.log(country);
    // Prevents errors if no country is selected
    // if (country === null || country === undefined) {
    //   setCountry('');
    // }
    // Tells the application to show loading spinners because a data fetch has been called
    setFetchedData(true);
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // CHANGE THIS TO NON-PUBLIC IN PRODUCTION
    const url =
      searchMethod === 'city'
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city},${country.value}&units=${unitOfMeasurement}&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat.toString()}&lon=${location.lon.toString()}&units=${unitOfMeasurement}&appid=${API_KEY}`;
    const response = await fetch(url); // fetches data from 3rd party api
    // If no country is found, then calls the notFound function that will render where the cards would render
    if (response.status === 404) {
      throw new Error(response.statusText);
    } else return await response.json();
  } catch (error) {
    setFetchedData(false);
    return { error };
  }
};
