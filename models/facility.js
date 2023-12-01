const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: String,
  description: String,
  available: Boolean // Indicates if the facility is available for booking
});

module.exports = mongoose.model('Facility', facilitySchema);
