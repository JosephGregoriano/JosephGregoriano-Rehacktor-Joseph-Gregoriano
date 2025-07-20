import { useState, useEffect, useCallback } from 'react';

const useFetchSolution = (initialUrl) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  const load = useCallback(async () => {
    setData(null);
    setError(null);

    if (!url) {
      setError("Error URL: The URL for fetching data is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("useFetchSolution: Fetch error:", error);
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    url,
    loading,
    error,
    data,
    load,
    updateUrl: setUrl,
  };
};

export default useFetchSolution;