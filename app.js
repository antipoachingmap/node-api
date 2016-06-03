var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var router = require('./config/routes');
var config = require('./config/env/' + (process.env.NODE_ENV || 'development'));

var port = process.env.PORT || config.port;

var logger = require('./config/logger')(app);

mongoose.connect(process.env.MONGO_URI || config.mongoUri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1', router);

app.listen(port, function() {
  logger.info('Express is listening on port: ' + port);
});

module.exports = app;