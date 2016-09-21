var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('POST /teams', function() {

  it('should respond with new entry in Teams collection', function(done) {
    request(app)
      .post('/teams')
      .expect(200)
      .expect('Content-Type', /json/)
      .send({'name': 'tito', 'description': 'un test', 'color': '#FFFFFF'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) done(err);
        res.body.should.have.property('name');
	res.body.should.have.property('color')
        done();
      });
  });
})

