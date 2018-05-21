var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AgencySchema = new Schema(
  {
    _id: {type: String, required: true},
    original_address: {type: String, required: true},
    fax: String,
    valid_license_since: {type: Number, required: true},
    district: {type: String, required: true},
    chinese_name: String,
    telephone: String,
    placement_type: {type: String, required: true},
    longitude: Number,
    english_name: {type: String, required: true},
    latitude: Number,
    email: String
  },
  {collection: 'employmentAgenciesMongoose'}
);

//Export model
module.exports = mongoose.model('Agency', AgencySchema);
