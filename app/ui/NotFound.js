export default function NotFound({ error }) {
  let message = "The city you searched for doesn't exist.";

  if (error === 'geolocation error')
    message =
      'Could not grab your geolocation - please try again or enable geolocation in your browser.';

  return <h2>{message}</h2>;
}
