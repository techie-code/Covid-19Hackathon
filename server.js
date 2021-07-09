var PORT = 5000;
var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
var app = express();
var http = require('http');
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('Your MongoDB Link', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'hardwork never fails',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use(expressLayouts);
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

var index = require('./routes/index');
app.use('/', index);


app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


app.listen(PORT, () => console.log('App is listening on url'))
