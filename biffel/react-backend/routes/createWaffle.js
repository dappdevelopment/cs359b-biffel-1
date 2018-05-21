const express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var db = req.app.get('db');
  var userAccount = req.app.get('userAccount');
  var contract = req.app.get('contract');
  contract.methods.createWaffle(req.body.numberOfSlots, req.body.slotPrice)
    .send({from: userAccount})
    .then(resp => res.send(resp))
    .catch((err) => res.send(err))
});

module.exports = router;
