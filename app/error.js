'use client';

import '@/app/ui/styles/error.scss';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="error__global">
      <h2>Looks like a meteor shower! Something went wrong...</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the page
          () => reset()
        }
      >
        Send me back to safety
      </button>
    </main>
  );
}
