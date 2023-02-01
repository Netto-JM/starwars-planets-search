// inspiration for this hook is a combination from live lectures bellow:
// https://github.com/tryber/sd-026-a-live-lectures/blob/lecture/frontend/9.3/src/hooks/useFetch.js
// and the article bellow:
// https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

import { useState, useEffect, useRef } from 'react';

function useFetch(url, filterData = (data) => (data), initialData = []) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const cache = useRef({});

  useEffect(() => {
    if (!url) return;

    const handleError = ({ ok, status }, apiResponse) => {
      try {
        if (!ok) {
          const apiError = new Error(
            `The endpoint ${url} responded with status code: ${status}`,
          );
          apiError.response = apiResponse;
          throw apiError;
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    const handleResponse = async (response) => {
      const apiResponse = await response.json();
      handleError(response, apiResponse);
      return apiResponse;
    };

    const fetchData = async () => {
      setIsLoading(true);
      // if (cache.current[url]) { *comment for test purposes
      //   const cachedResponse = cache.current[url];
      //   return handleResponse(cachedResponse);
      // }
      const response = await fetch(url);
      cache.current[url] = response;
      return handleResponse(response);
    };
    fetchData()
      .then(filterData)
      .then(setData);
  }, [url]);

  return { isLoading, error, data };
}

export default useFetch;
