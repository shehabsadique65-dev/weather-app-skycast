import { useState, useCallback, useRef } from 'react';
import { fetchGeocode } from '../services/api';
const useGeocode = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const search = useCallback((query) => {
    clearTimeout(debounceRef.current);
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchGeocode(query.trim());
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  }, []);
  const clear = useCallback(() => {
    clearTimeout(debounceRef.current);
    setResults([]);
  }, []);
  return { results, loading, search, clear };
};
export default useGeocode;
