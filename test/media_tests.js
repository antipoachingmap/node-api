var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var Media = require('../models/Media');
var mongoose = require('mongoose');

after(function(done) {
  Media.collection.drop();
  done();
});

describe('GET /v1/media', function() {
  it('should return a 200 response', function(done) {
    request(app)
      .get('/v1/media')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('shoould return an array', function(done) {
    request(app)
      .get('/v1/media')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('POST /v1/media', function() {
  it('should return a 201 response', function(done) {
    request(app)
      .post('/v1/media')
      .set('Accept', 'application/json')
      .send({
          description: "A party parrot",
          format: "png",
          timestamp: 1463322188,
          filename: "party_parrot",
          filesize: 500123
      })
      .expect(201, done);
  });

  it('should return a valid record', function(done) {
    request(app)
      .post('/v1/media')
      .set('Accept', 'application/json')
      .send({
          description: "A party parrot",
          format: "png",
          timestamp: 1463322188,
          filename: "party_parrot",
          filesize: 500123
      })
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.description).to.equal("A party parrot");
        expect(res.body.format).to.equal("png");
        expect(res.body.timestamp).to.equal(1463322188);
        expect(res.body.filename).to.equal("party_parrot");
        expect(res.body.filesize).to.equal(500123);
        done();
      });
  });
})

describe('GET /v1/media/:id', function() {

  var e;

  beforeEach(function(done) {
    this.timeout(5000);

    Media.create({
      description: "A party parrot",
      format: "png",
      timestamp: 1463322188,
      filename: "party_parrot",
      filesize: 500123
    }, function(err, event) {
      e = event;
      done(err);
    });
  });

  it('should return a 200 response', function(done) {
    request(app)
      .get('/v1/media/' + e._id)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return a valid record', function(done) {
    request(app)
      .get('/v1/media/' + e._id)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.description).to.equal("A party parrot");
        expect(res.body.format).to.equal("png");
        expect(res.body.timestamp).to.equal(1463322188);
        expect(res.body.filename).to.equal("party_parrot");
        expect(res.body.filesize).to.equal(500123);
        done();
      });
  });
});

describe('PUT /v1/media/:id', function() {

  var e;

  beforeEach(function(done) {
    this.timeout(5000);

    Media.create({
      description: "A party parrot",
      format: "png",
      timestamp: 1463322188,
      filename: "party_parrot",
      filesize: 500123
    }, function(err, event) {
      e = event;
      done(err);
    });
  });

  it('should return a 200 response', function(done) {
    request(app)
      .put('/v1/media/' + e._id)
      .set('Accept', 'application/json')
      .send({
        description: "A party pangolin",
        format: "png",
        timestamp: 1463322187,
        filename: "party_pangolin",
        filesize: 500666
      })
      .expect(200, done);
  });

  it('should return a valid record', function(done) {
    request(app)
      .put('/v1/media/' + e._id)
      .set('Accept', 'application/json')
      .send({
        description: "A party pangolin",
        format: "png",
        timestamp: 1463322187,
        filename: "party_pangolin",
        filesize: 500666
      })
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.description).to.equal("A party pangolin");
        expect(res.body.format).to.equal("png");
        expect(res.body.timestamp).to.equal(1463322187);
        expect(res.body.filename).to.equal("party_pangolin");
        expect(res.body.filesize).to.equal(500666);
        done();
      });
  });
});