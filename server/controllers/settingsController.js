const Settings = require('../models/Settings');
const getSettings = async (req, res) => {
  const { sessionId } = req.query;
  let settings = await Settings.findOne({ sessionId });
  if (!settings) {
    settings = await Settings.create({ sessionId });
  }
  res.json(settings);
};
const updateSettings = async (req, res) => {
  const { sessionId } = req.body;
  const updates = { ...req.body };
  delete updates.sessionId;
  const settings = await Settings.findOneAndUpdate(
    { sessionId },
    { $set: updates },
    { new: true, upsert: true }
  );
  res.json(settings);
};
module.exports = { getSettings, updateSettings };
