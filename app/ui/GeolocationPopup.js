import '@/app/ui/styles/GeolocationPopup.scss';
import { useState } from 'react';

export default function GeolocationPopup({ setIsPopupOpen, setUseLocation }) {
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(false);
    setUseLocation(true);
    setIsHidden(true);
  };

  return (
    <div
      className={`geolocationPopup ${!isHidden ? '' : 'geolocationPopup--hidden'}`}
    >
      <p>
        Some parts of this application require the use of your location. If you
        would like to fully utilize this app and have the ability to use your
        coordinates to obtain the current weather, please allow your browser to
        use your location.
      </p>
      <button onClick={handleClick}>I understand</button>
    </div>
  );
}
