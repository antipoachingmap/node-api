var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8000;
var router = require('./config/routes');
var db = require('./config/database');

mongoose.connect(db.uri);

if(process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1', router);

app.listen(PORT, function() {
  console.log('Express is listening on port: ' + PORT);
});

module.exports = app;