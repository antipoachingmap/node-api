var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
  description: String,
  format: String,
  timestamp: Number,
  filename: String,
  filesize: Number,
  data: Buffer
});

module.exports = mongoose.model('Media', mediaSchema);