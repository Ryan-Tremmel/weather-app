import { useState, useEffect } from 'react';

export default function useGeolocation(useLocation) {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [geolocationError, setGeolocationError] = useState(null);

  useEffect(() => {
    if (!useLocation) return;
    else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setGeolocationError(err.message);
        },
      );
    } else {
      setGeolocationError('Geolocation not supported.');
    }
  }, [useLocation]);

  return { location, geolocationError };
}
