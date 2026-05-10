const axios = require('axios');
const BASE = 'https://api.openweathermap.org';
const GEO_BASE = 'https://api.openweathermap.org/geo/1.0';
const AQI_BASE = 'https://api.openweathermap.org/data/2.5';
const key = () => process.env.OPENWEATHER_API_KEY;
const getCurrentWeather = async (req, res, next) => {
  const { lat, lon } = req.query;
  const { data } = await axios.get(`${BASE}/data/2.5/weather`, {
    params: { lat, lon, appid: key(), units: 'metric' },
  });
  res.json(data);
};
const getForecast = async (req, res, next) => {
  const { lat, lon } = req.query;
  const { data } = await axios.get(`${BASE}/data/2.5/forecast`, {
    params: { lat, lon, appid: key(), units: 'metric', cnt: 40 },
  });
  res.json(data);
};
const getAirQuality = async (req, res, next) => {
  const { lat, lon } = req.query;
  const { data } = await axios.get(`${AQI_BASE}/air_pollution`, {
    params: { lat, lon, appid: key() },
  });
  res.json(data);
};
const getGeocode = async (req, res, next) => {
  const { q, limit = 5 } = req.query;
  const { data } = await axios.get(`${GEO_BASE}/direct`, {
    params: { q, limit, appid: key() },
  });
  res.json(data);
};
module.exports = { getCurrentWeather, getForecast, getAirQuality, getGeocode };
