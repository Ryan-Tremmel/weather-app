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

    // Prevents errors if no country is selected
    // if (country === null || country === undefined) {
    //   setCountry('');
    // }

    // Tells the application to show loading spinners because a data fetch has been called
    setFetchedData(true);

    // OPENWEATHER API CALL
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // CHANGE THIS TO NON-PUBLIC IN PRODUCTION - NEXT_PUBLIC_ IN DEV
    const url =
      searchMethod === 'city'
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city},${country.value}&units=${unitOfMeasurement}&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat.toString()}&lon=${location.lon.toString()}&units=${unitOfMeasurement}&appid=${API_KEY}`;
    const responseWeather = await fetch(url);

    // If no country is found after searching, then will throw an error to begin error handling processes
    if (responseWeather.status === 404) {
      throw new Error(responseWeather.statusText);
    }

    // Sets response to weatherData (not the state) and sets country code to begin REST Countries API call
    const weatherData = await responseWeather.json();
    const countryCode = weatherData?.sys?.country;

    // If there is a failure in grabbing a country code, throws error
    if (!countryCode) {
      throw new Error('No country code found or weather data fetch failed.');
    }

    // REST COUNTRIES API CALL
    const responseCountry = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
    );

    // If there was an error in fetching the data
    if (!responseCountry.ok) {
      throw new Error('Failed to fetch country details');
    }

    const countryData = await responseCountry.json();

    return { weatherData, countryData };
  } catch (error) {
    setFetchedData(false);
    return { error };
  }
};
