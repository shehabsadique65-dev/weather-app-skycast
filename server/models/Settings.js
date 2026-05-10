const mongoose = require('mongoose');
const settingsSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    temperatureUnit: { type: String, enum: ['celsius', 'fahrenheit', 'kelvin'], default: 'celsius' },
    windSpeedUnit: { type: String, enum: ['kmh', 'mph', 'ms'], default: 'kmh' },
    pressureUnit: { type: String, enum: ['hpa', 'inhg'], default: 'hpa' },
    timeFormat: { type: String, enum: ['12h', '24h'], default: '24h' },
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    mapLayer: { type: String, default: 'temperature' },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Settings', settingsSchema);
