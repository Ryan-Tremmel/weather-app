import { useEffect, useRef, useState } from 'react';

export default function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(0);
  const elementRef = useRef(null);

  // Ensures that handleResize only happens every 0.2 seconds
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  useEffect(() => {
    const handleResize = debounce(() => {
      if (elementRef.current) {
        setScreenWidth(elementRef.current.offsetWidth);
      }
    }, 200);

    const resizeObserver = new ResizeObserver(handleResize);

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);
  return { screenWidth, elementRef };
}
