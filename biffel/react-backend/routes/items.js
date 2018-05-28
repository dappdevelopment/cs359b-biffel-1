const express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var AgencyModel = require('../models/agency')

router.get('/', function(req, res, next) {
  AgencyModel.find({}, '_id english_name', function (err, agencies) {
    console.log('agencies', agencies);
    if (err){
      console.log('err', err);
      res.send([]);
    } else {

      justNames = agencies.map((e) => e.english_name)

      uniqueAgencies = agencies.filter(function(agency, pos) {
        return justNames.indexOf(agency.english_name) === pos;
      })

      uniqueAgencies.sort(function(a, b){
        var nameA = a.english_name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.english_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })

      res.send(uniqueAgencies);
    }
  })
});

module.exports = router;
