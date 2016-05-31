var router = require('express').Router();
var eventsController = require('../controllers/events');
var mediaController = require('../controllers/media');
var User = require('../models/User');

function secureRoute(req, res, done) {
  if(!req.headers.authorization || !req.headers.authorization.match(/^Basic /)) return res.sendStatus(401);

  var authData = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString().split(':');

  User.findOne({ email: authData[0], password: authData[1] }).exec(function(err, user) {
    if(err || !user) return res.sendStatus(401);
    done();
  });
}

router.route('/events')
  .all(secureRoute)
  .get(eventsController.index)
  .post(eventsController.create);

router.route('/events/:id')
  .all(secureRoute)
  .get(eventsController.show)
  .put(eventsController.update);

router.route('/media')
  .all(secureRoute)
  .get(mediaController.index)
  .post(mediaController.create);

router.route('/media/:id')
  .all(secureRoute)
  .get(mediaController.show)
  .put(mediaController.update);

module.exports = router;