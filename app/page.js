'use client';

import { useState } from 'react';
import GeolocationPopup from '@/app/ui/GeolocationPopup';
import Form from '@/app/ui/Form';
import Card from '@/app/ui/Card';

export default function app() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [useLocation, setUseLocation] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('standard');

  return (
    <div className="app-container">
      <GeolocationPopup
        setIsPopupOpen={setIsPopupOpen}
        setUseLocation={setUseLocation}
      />
      <main className={isPopupOpen ? 'disabled' : ''}>
        <Form
          useLocation={useLocation}
          setFetchedData={setFetchedData}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          unitOfMeasurement={unitOfMeasurement}
          setUnitOfMeasurement={setUnitOfMeasurement}
        />
        <section className="weatherData__section">
          {!fetchedData ? (
            ''
          ) : (
            <>
              <h2>
                {weatherData
                  ? `Viewing Current Weather for ${weatherData.name}`
                  : 'Getting current weather...'}
              </h2>
              <div className="card-container">
                <Card
                  weatherData={weatherData}
                  unitOfMeasurement={unitOfMeasurement}
                  cardType={'left'}
                />
                <Card
                  weatherData={weatherData}
                  unitOfMeasurement={unitOfMeasurement}
                  cardType={'middle'}
                />
                <Card
                  weatherData={weatherData}
                  unitOfMeasurement={unitOfMeasurement}
                  cardType={'right'}
                />
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
