const mongoose = require('mongoose');

const _schema = mongoose.Schema({
  NO: Number,
  building_name: String,
  city: String,
  district: String,
  address: String,
  floor_count: Number,
  company_count: Number,
  people_count: Number,
  internal_count: Number,
  external_count: Number,
  machine_type: [String],
  ad_restriction: [String],
  location: Object,
  location_type: String,
  formatted_address: String,
  geoCodeStatus: String,
  geoCoded: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Commercial', _schema);
