import { useState, useEffect, useCallback } from 'react';
import { fetchCurrentWeather } from '../services/api';
const useWeather = (lat, lon) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const load = useCallback(async () => {
    if (lat == null || lon == null) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCurrentWeather(lat, lon);
      setData(result);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);
  useEffect(() => { load(); }, [load]);
  return { data, loading, error, refetch: load };
};
export default useWeather;
