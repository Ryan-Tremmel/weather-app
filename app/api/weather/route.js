import eliminateSpace from '@/app/lib/eliminateSpace';

export async function POST(req) {
  try {
    const {
      searchMethod,
      cityInputText,
      country,
      unitOfMeasurement,
      location,
    } = await req.json();

    // Eliminates extra space in city (las    vegas to las vegas)
    const city = eliminateSpace(cityInputText);

    // OPENWEATHER API CALL
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    const url =
      searchMethod === 'city'
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${unitOfMeasurement}&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${unitOfMeasurement}&appid=${API_KEY}`;

    const responseWeather = await fetch(url);
    // If no country is found after searching, then will throw an error to begin error handling processes
    if (!responseWeather.ok) {
      return new Response(
        JSON.stringify({ error: 'Weather data fetch failed' }),
        { status: 404 },
      );
    }

    // Sets response to weatherData (not the state) and sets country code to begin REST Countries API call
    const weatherData = await responseWeather.json();
    const countryCode = weatherData?.sys?.country;

    // If there is a failure in grabbing a country code, throws error
    if (!countryCode) {
      return new Response(JSON.stringify({ error: 'No country code found' }), {
        status: 500,
      });
    }

    // REST COUNTRIES API CALL
    const responseCountry = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
    );

    // If there was an error in fetching the data
    if (!responseCountry.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch country details' }),
        { status: 500 },
      );
    }

    const countryData = await responseCountry.json();

    return new Response(JSON.stringify({ weatherData, countryData }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error occurred' }), {
      status: 500,
    });
  }
}
