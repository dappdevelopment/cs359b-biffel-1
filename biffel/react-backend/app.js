require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var createWaffleRouter = require('./routes/createWaffle');

var app = express();

var mongoose = require('mongoose');
var Web3 = require('web3');

var mongoUri = 'mongodb://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@ds217310.mlab.com:17310/biffel';
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
app.set('db', db);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//ws://localhost:3000
//https://biffel.herokuapp.com/
//PORT=3001 node bin/www
console.log('process.env.WEB3_PROVIDER', process.env.WEB3_PROVIDER);
var web3 = new Web3(Web3.givenProvider || process.env.WEB3_PROVIDER);

var contract;
var userAccount;
var contractAddress;

var contractDataPromise = require('./contracts/Biffel.json');
var networkIdPromise = web3.eth.net.getId(); // resolves on the current network i
var accountsPromise = web3.eth.getAccounts(); // resolves on an array of accounts

Promise.all([contractDataPromise, networkIdPromise, accountsPromise])
  .then(function initApp(results) {
    var contractData = results[0];  // resolved value of contractDataPromise
    console.log('contractData', contractData)
    var networkId = results[1];     // resolved value of networkIdPromise
    console.log('networkId', networkId);
    var accounts = results[2];      // resolved value of accountsPromise
    userAccount = accounts[0];
    console.log("userAccount", userAccount);

    if (!(networkId in contractData.networks)) {
      throw new Error("Contract not found in selected Ethereum network on MetaMask.");
    }

    contractAddress = contractData.networks[networkId].address;
    console.log('contractAddress', contractAddress);
    contract = new web3.eth.Contract(contractData.abi, contractAddress);
    app.set('contract', contract)
    app.set('userAccount', userAccount)
  })
  .catch(console.error);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/createWaffle', createWaffleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
