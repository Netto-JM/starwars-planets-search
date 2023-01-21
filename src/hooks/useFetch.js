// inspiration for this hook is a combination from live lectures bellow:
// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
// and the article bellow:
// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

import { useState, useEffect, useRef } from 'react';

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const cache = useRef({});

  useEffect(() => {
    if (!url) return;

    const handleError = ({ ok, status }, apiResponse) => {
      if (!ok) {
        const apiError = new Error(
          `The endpoint ${url} responded with status code: ${status}`,
        );
        apiError.response = apiResponse;
        throw apiError;
      }
    };

    const handleResponse = async (response) => {
      const apiResponse = await response.json();
      handleError(response, apiResponse);
      return apiResponse;
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (cache.current[url]) {
          const cachedResponse = cache.current[url];
          return handleResponse(cachedResponse);
        }
        const response = await fetch(url);
        cache.current[url] = response;
        return handleResponse(response);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
      .then(setData);
  }, [url]);

  return { isLoading, error, data };
}

export default useFetch;
