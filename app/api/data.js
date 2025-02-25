export const fetchWeatherData = async ({
  setFetchedData,
  isLoaded,
  searchMethod,
  city,
  country,
  unitOfMeasurement,
  location,
}) => {
  try {
    // Tells the application to show loading spinners because a data fetch has been called
    setFetchedData(true);

    // Fallback for country dropdown
    if (!isLoaded) {
      country = country?.value;
    }

    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchMethod,
        city,
        isLoaded,
        country,
        unitOfMeasurement,
        location,
      }),
    });

    const { weatherData, countryData, error } = await response.json();

    if (!response.ok) throw new Error(error || 'Unknown error');

    return { weatherData, countryData };
  } catch (error) {
    setFetchedData(false);
    return { error };
  }
};
