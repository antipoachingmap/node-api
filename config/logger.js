var expressWinston = require('express-winston');
var logger = require('winston-color');

module.exports = function(app) {

  if(process.env.NODE_ENV !== 'test') {
    app.use(expressWinston.logger({
      winstonInstance: logger,
      meta: false,
      msg: "HTTP {{res.statusCode}} {{req.method}} {{req.url}}",
      colorStatus: true,
    }));
  }

  return logger;
}