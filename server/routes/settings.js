const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();
router.get('/', asyncHandler(getSettings));
router.put('/', asyncHandler(updateSettings));
module.exports = router;
