import { useState, useEffect, useCallback } from 'react';
import { getLocations, addLocation, deleteLocation, reorderLocations } from '../services/api';
const useSavedLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);
  const add = useCallback(async (location) => {
    const data = await addLocation(location);
    setLocations((prev) => [...prev, data]);
    return data;
  }, []);
  const remove = useCallback(async (id) => {
    await deleteLocation(id);
    setLocations((prev) => prev.filter((l) => l._id !== id));
  }, []);
  const reorder = useCallback(async (orderedIds) => {
    const data = await reorderLocations(orderedIds);
    setLocations(data);
  }, []);
  return { locations, loading, error, add, remove, reorder, refetch: load };
};
export default useSavedLocations;
