var mongoose = require('mongoose');

var extraSchema = new mongoose.Schema({
  animals: mongoose.Schema.Types.Mixed,
  details: String
});

var eventSchema = new mongoose.Schema({
  description: String,
  severity: String,
  timestamp: Number,
  lat: Number,
  lng: Number,
  media: [{ type: mongoose.Schema.ObjectId, ref: 'Media' }],
  extra: extraSchema
});

module.exports = mongoose.model('Event', eventSchema);