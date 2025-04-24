import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

const FlightWidget = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let script = null;
    let retryTimeout = null;

    const loadScript = () => {
      setLoading(true);
      setError(null);

      script = document.createElement('script');
      script.src = "https://tp.media/content?trs=409664&shmarker=624965&locale=en&curr=USD&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121";
      script.async = true;
      script.charset = "utf-8";
      
      script.onload = () => {
        setLoading(false);
        setRetryCount(0);
      };

      script.onerror = () => {
        if (retryCount < maxRetries) {
          retryTimeout = setTimeout(() => {
            setRetryCount(prev => prev + 1);
            loadScript();
          }, 1000 * Math.pow(2, retryCount)); // Exponential backoff
        } else {
          setError('Failed to load flight widget after multiple attempts');
          setLoading(false);
        }
      };

      const container = document.getElementById('flight-widget-container');
      if (container) {
        container.appendChild(script);
      }
    };

    loadScript();

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [retryCount]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Find Flights</h2>
      <div id="flight-widget-container" className="min-h-[400px] relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => {
                  setRetryCount(0);
                  setError(null);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightWidget; 