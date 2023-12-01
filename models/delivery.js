const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  unit: String,
  description: String
});

module.exports = mongoose.model('Delivery', deliverySchema);
