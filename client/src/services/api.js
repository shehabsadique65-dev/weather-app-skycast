import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});
const cache = new Map();
const TTL = 10 * 60 * 1000;
const cached = async (key, fetcher) => {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) return hit.data;
  const data = await fetcher();
  cache.set(key, { data, ts: Date.now() });
  return data;
};
export const fetchCurrentWeather = (lat, lon) =>
  cached(`current_${lat}_${lon}`, async () => {
    const { data } = await api.get('/weather/current', { params: { lat, lon } });
    return data;
  });
export const fetchForecast = (lat, lon) =>
  cached(`forecast_${lat}_${lon}`, async () => {
    const { data } = await api.get('/weather/forecast', { params: { lat, lon } });
    return data;
  });
export const fetchAirQuality = (lat, lon) =>
  cached(`aqi_${lat}_${lon}`, async () => {
    const { data } = await api.get('/weather/airquality', { params: { lat, lon } });
    return data;
  });
export const fetchGeocode = async (q) => {
  const { data } = await api.get('/weather/geocode', { params: { q } });
  return data;
};
export const getLocations = async () => {
  const { data } = await api.get('/locations');
  return data;
};
export const addLocation = async (location) => {
  const { data } = await api.post('/locations', location);
  return data;
};
export const deleteLocation = async (id) => {
  const { data } = await api.delete(`/locations/${id}`);
  return data;
};
export const reorderLocations = async (orderedIds) => {
  const { data } = await api.put('/locations/reorder', { orderedIds });
  return data;
};
export const getSettings = async (sessionId) => {
  const { data } = await api.get('/settings', { params: { sessionId } });
  return data;
};
export const updateSettings = async (settings) => {
  const { data } = await api.put('/settings', settings);
  return data;
};
