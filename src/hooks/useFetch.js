import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      const apiResponse = await response.json();

      if (!response.ok) {
        const apiError = new Error(
          `The endpoint ${url} responded with status code: ${response.status}`,
        );
        apiError.response = apiResponse;
        throw apiError;
      }

      return apiResponse;
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, makeFetch };
}

export default useFetch;
