const mongoose = require('mongoose');

const _schema = mongoose.Schema({
  NO: Number,
  building_name: String,
  city: String,
  district: String,
  community: String,
  address: String,
  building_count: Number,
  unit_count: Number,
  floor_count: [Number],
  resident_count: Number,
  elevator_count: Number,
  contracted_count: Number,
  installed_count: Number,
  established_in: String,
  price_per: String,
  smallest_size: String,
  largest_size: String,
  'unit_type_count-': String,
  'unit_type_count+': String,
  ad_restriction: [String],
});

module.exports = mongoose.model('Residential', _schema);
