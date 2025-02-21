'use client';

import { useState } from 'react';
import useScreenWidth from '@/app/lib/useScreenWidth';
import GeolocationPopup from '@/app/ui/GeolocationPopup';
import NotFound from '@/app/ui/NotFound';
import Form from '@/app/ui/Form';
import Card from '@/app/ui/Card';
import Copyright from '@/app/ui/Copyright';

export default function app() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [useLocation, setUseLocation] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ weatherData: null, countryData: null });
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('imperial');
  const { screenWidth, elementRef } = useScreenWidth();

  return (
    <div className="app-container" ref={elementRef}>
      <GeolocationPopup
        setIsPopupOpen={setIsPopupOpen}
        setUseLocation={setUseLocation}
      />
      <main className={isPopupOpen ? 'disabled' : ''}>
        <div className="header__container">
          <h1 className="header__text">Weather App</h1>
          <ion-icon name="rainy-outline" className="header__icon"></ion-icon>
        </div>
        <Form
          useLocation={useLocation}
          setFetchedData={setFetchedData}
          data={data}
          setData={setData}
          unitOfMeasurement={unitOfMeasurement}
          setUnitOfMeasurement={setUnitOfMeasurement}
          setError={setError}
          screenWidth={screenWidth}
        />
        <section className="weatherData__section">
          {!fetchedData ? (
            ''
          ) : (
            <>
              <h2>
                {data.weatherData
                  ? `Viewing Current Weather for ${data.weatherData.name}, ${data.countryData.name.common}`
                  : 'Getting current weather...'}
              </h2>
              <div className="card-container">
                <Card
                  data={data}
                  unitOfMeasurement={unitOfMeasurement}
                  cardType={'left'}
                  screenWidth={screenWidth}
                />
                <Card
                  data={data}
                  unitOfMeasurement={unitOfMeasurement}
                  cardType={'middle'}
                  screenWidth={screenWidth}
                />
                <Card
                  data={data}
                  unitOfMeasurement={unitOfMeasurement}
                  cardType={'right'}
                  screenWidth={screenWidth}
                />
              </div>
            </>
          )}
          {error ? <NotFound error={error} /> : ''}
        </section>
      </main>
      <footer className="footer">
        <Copyright />
      </footer>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
}
