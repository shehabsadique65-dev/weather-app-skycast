const Location = require('../models/Location');
const getLocations = async (req, res) => {
  const locations = await Location.find().sort({ order: 1 });
  res.json(locations);
};
const addLocation = async (req, res) => {
  const { name, country, lat, lon } = req.body;
  const count = await Location.countDocuments();
  const location = await Location.create({ name, country, lat, lon, order: count });
  res.status(201).json(location);
};
const deleteLocation = async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  res.json({ success: true });
};
const reorderLocations = async (req, res) => {
  const { orderedIds } = req.body;
  const updates = orderedIds.map((id, index) =>
    Location.findByIdAndUpdate(id, { order: index })
  );
  await Promise.all(updates);
  const locations = await Location.find().sort({ order: 1 });
  res.json(locations);
};
module.exports = { getLocations, addLocation, deleteLocation, reorderLocations };
