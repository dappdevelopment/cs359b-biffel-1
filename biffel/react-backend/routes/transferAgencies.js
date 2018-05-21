const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AgencyModel = require('../models/agency');
//mongodb://<dbuser>:<dbpassword>@ds249757.mlab.com:49757/help
var mongoUri = 'mongodb://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@ds249757.mlab.com:49757/help';
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
mongoose.connect(mongoUri);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//https://daveceddia.com/create-react-app-express-backend/
router.get('/', function(req, res, next) {
  mongoose.connection.db.collection('employmentAgenciesFDW', function (err, collection) {
    collection.find({}).toArray(function (err, docs) {
      docs.forEach(function(doc){
        var newDoc = {}
        newDoc._id = doc._id
        newDoc.original_address = doc.original_address;

        var fax = doc.fax;
        if(fax.length <= 1){
          fax = null
        }
        newDoc.fax = fax

        newDoc.valid_license_since = doc.valid_license_since;
        newDoc.district = doc.district;
        newDoc.chinese_name = doc.chinese_name;

        var telephone = doc.telephone;
        if(telephone.length <= 1){
          telephone = null
        }
        newDoc.telephone = telephone

        newDoc.placement_type = doc.placement_type;

        var longitude = doc.longitude;
        if(isNaN(longitude)){
          longitude = null
        }
        newDoc.longitude = longitude;

        newDoc.english_name = doc.english_name;

        var latitude = doc.latitude;
        if(isNaN(latitude)){
          latitude = null
        }
        newDoc.latitude = latitude;

        var email = doc.email
        if(email.length <= 1){
          email = null
        }
        newDoc.email = email

        AgencyModel.create(newDoc, function (err, instance) {
          if (err){
            console.log('error', err);
            console.log('doc', newDoc);
            console.log('');
          }
        });

      })
    });
  });
  res.send({hi: 'hello'});
});

module.exports = router;
