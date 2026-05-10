const express = require('express');
const { getLocations, addLocation, deleteLocation, reorderLocations } = require('../controllers/locationsController');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();
router.get('/', asyncHandler(getLocations));
router.post('/', asyncHandler(addLocation));
router.delete('/:id', asyncHandler(deleteLocation));
router.put('/reorder', asyncHandler(reorderLocations));
module.exports = router;
