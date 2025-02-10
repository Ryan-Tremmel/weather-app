import '@/app/ui/styles/GeolocationPopup.scss';
import { useState } from 'react';

export default function GeolocationPopup({ setIsPopupOpen, setUseLocation }) {
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(false);
    if (e.target.id === 'denyGeoloc') setIsHidden(true);
    else if (e.target.id === 'acceptGeoloc') {
      setUseLocation(true);
      setIsHidden(true);
    }
  };

  return (
    <div
      className={`geolocationPopup ${!isHidden ? '' : 'geolocationPopup--hidden'}`}
    >
      <p>
        Some parts of this application require the use of your location. If you
        would like to fully utilize this app and have the ability to use your
        coordinates to obtain the current weather, please press "Use My
        Location" below.
      </p>
      <div className="geolocationPopup__buttons">
        <button id="denyGeoloc" onClick={handleClick}>
          Don't Use My Location
        </button>
        <button id="acceptGeoloc" onClick={handleClick}>
          Use My Location
        </button>
      </div>
    </div>
  );
}
