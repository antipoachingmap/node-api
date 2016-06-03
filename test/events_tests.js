process.env.NODE_ENV = 'test';

var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Event = require('../models/Event');
var User = require('../models/User');

var authToken = (new Buffer('test@test.com:test').toString('base64'));

after(function(done) {
  User.collection.drop();
  Event.collection.drop();
  done();
});

beforeEach(function(done) {
  User.collection.drop();
  User.create({
    email: 'test@test.com',
    password: 'test',
    passwordConfirmation: 'test'
  }, done);
});

describe('GET /v1/events', function() {
  it('should return a 200 response', function(done) {
    request(app)
      .get('/v1/events')
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .expect(200, done);
  });

  it('should return an array', function(done) {
    request(app)
      .get('/v1/events')
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('POST /v1/events', function() {
  it('should return a 201 response', function(done) {
    request(app)
      .post('/v1/events')
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .send({
        description: "Seven elephants and a lion found dead",
        severity: "critical",
        timestamp: 1463322188,
        lat: 13.5317,
        lng: 2.4604,
        extra: {
          animals: { elephants: 7, lions: 1 },
          details: "tusks missing"
        }
      })
      .expect(201, done);
  });

  it('should return a valid record', function(done) {
    request(app)
      .post('/v1/events')
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .send({
        description: "Seven elephants and a lion found dead",
        severity: "critical",
        timestamp: 1463322188,
        lat: 13.5317,
        lng: 2.4604,
        extra: {
          animals: { elephants: 7, lions: 1 },
          details: "tusks missing"
        }
      })
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.description).to.equal("Seven elephants and a lion found dead");
        expect(res.body.severity).to.equal("critical");
        expect(res.body.timestamp).to.equal(1463322188);
        expect(res.body.lat).to.equal(13.5317);
        expect(res.body.lng).to.equal(2.4604);
        expect(res.body.media).to.be.an('array');
        expect(res.body.extra).to.be.an('object');
        done();
      });
  });
})

describe('GET /v1/events/:id', function() {

  var e;

  beforeEach(function(done) {
    this.timeout(5000);

    Event.create({
      description: "Seven elephants and a lion found dead",
      severity: "critical",
      timestamp: 1463322188,
      lat: 13.5317,
      lng: 2.4604,
      extra: {
        animals: { elephants: 7, lions: 1 },
        details: "tusks missing"
      }
    }, function(err, event) {
      e = event;
      done(err);
    });
  });

  it('should return a 200 response', function(done) {
    request(app)
      .get('/v1/events/' + e._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .expect(200, done);
  });

  it('should return a valid record', function(done) {
    request(app)
      .get('/v1/events/' + e._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.description).to.equal("Seven elephants and a lion found dead");
        expect(res.body.severity).to.equal("critical");
        expect(res.body.timestamp).to.equal(1463322188);
        expect(res.body.lat).to.equal(13.5317);
        expect(res.body.lng).to.equal(2.4604);
        expect(res.body.media).to.be.an('array');
        expect(res.body.extra).to.be.an('object');
        done();
      });
  });
});

describe('PUT /v1/events/:id', function() {

  var e;

  beforeEach(function(done) {
    this.timeout(5000);

    Event.create({
      description: "Seven elephants and a lion found dead",
      severity: "critical",
      timestamp: 1463322188,
      lat: 13.5317,
      lng: 2.4604,
      extra: {
        animals: { elephants: 7, lions: 1 },
        details: "tusks missing"
      }
    }, function(err, event) {
      e = event;
      done(err);
    });
  });

  it('should return a 200 response', function(done) {
    request(app)
      .put('/v1/events/' + e._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .send({
        description: "Seven elephants and a lion found partying",
        severity: "info",
        timestamp: 1463322187,
        lat: 13.5317,
        lng: 2.4604,
        extra: {
          animals: { elephants: 7, lions: 1 },
          details: "tusks painted pink, whiskers awry"
        }
      })
      .expect(200, done);
  });

  it('should return a valid record', function(done) {
    request(app)
      .put('/v1/events/' + e._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic ' + authToken)
      .send({
        description: "Seven elephants and a lion found partying",
        severity: "info",
        timestamp: 1463322187,
        lat: 13.5317,
        lng: 2.4604,
        extra: {
          animals: { elephants: 7, lions: 1 },
          details: "tusks painted pink, whiskers awry"
        }
      })
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.description).to.equal("Seven elephants and a lion found partying");
        expect(res.body.severity).to.equal("info");
        expect(res.body.timestamp).to.equal(1463322187);
        expect(res.body.lat).to.equal(13.5317);
        expect(res.body.lng).to.equal(2.4604);
        expect(res.body.media).to.be.an('array');
        expect(res.body.extra).to.be.an('object');
        done();
      });
  });
});