'use client';

import { useState } from 'react';
import Form from '@/app/ui/Form';

export default function app() {
  const [weatherData, setWeatherData] = useState(null);
  return (
    <div className="app-container">
      <main>
        <Form weatherData={weatherData} setWeatherData={setWeatherData} />
        <section></section>
      </main>
    </div>
  );
}
