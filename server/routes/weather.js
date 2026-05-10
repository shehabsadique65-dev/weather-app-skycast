const express = require('express');
const { getCurrentWeather, getForecast, getAirQuality, getGeocode } = require('../controllers/weatherController');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();
router.get('/current', asyncHandler(getCurrentWeather));
router.get('/forecast', asyncHandler(getForecast));
router.get('/airquality', asyncHandler(getAirQuality));
router.get('/geocode', asyncHandler(getGeocode));
module.exports = router;
