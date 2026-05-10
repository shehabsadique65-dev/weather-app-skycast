const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Location', locationSchema);
