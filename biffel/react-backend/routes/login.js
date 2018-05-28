const express = require('express');
var router = express.Router();
var _ = require('lodash');

router.post('/', function(req, res, next) {
  var db = req.app.get('db');
  var userAccount = req.app.get('userAccount');
  var email = req.body.email;
  var password = req.body.password;

  var users = [
      {id: 0, email: 'jaimedeverall@gmail.com', password: 'password', name: 'Jaime Deverall', eth_address: '5667778'},
      {id: 1, email: 'jiwoolee@gmail.com', password: 'password', name: 'Jiwoo Lee', eth_address: '797069960'},
      {id: 2, email: 'miguelayala@gmail.com', password: 'password', name: 'Miguel Ayala', eth_address: '483895955'}
  ]

  var userObject;
  for (let user of users) {
    if(user.email === email && user.password === password){
      userObject = _.clone(user);
      break;
    }
  }

  if(userObject){
    res.status(200).send(userObject)
  }else{
    res.status(200).send({error: 'Incorrect email or password'})
  }
  
});

module.exports = router;
