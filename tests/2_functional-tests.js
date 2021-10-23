const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  test('Valid GET request to /api/convert', function (done) {
      chai
      .request(server)
      .get('/api/convert?input=10L')
      .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.returnNum, '2.64172');
      assert.equal(res.body.returnUnit, 'gal');
      done();
    });
  });

  test('Invalid unit GET request to /api/convert', function (done) {
      chai
      .request(server)
      .get('/api/convert?input=3g')
      .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, 'invalid unit');
      done();
    });
  });

  test('Invalid number GET request to /api/convert', function (done) {
      chai
      .request(server)
      .get('/api/convert?input=2..1mi')
      .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, 'invalid number');
      done();
    });
  });

  test('Invalid number and unit GET request to /api/convert', function (done) {
      chai
      .request(server)
      .get('/api/convert?input=2..1ij')
      .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.text, 'invalid number and unit');
      done();
    });
  });

  test('No number with unit GET request to /api/convert', function (done) {
      chai
      .request(server)
      .get('/api/convert?input=kg')
      .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.returnNum, '2.20462 ');
      assert.equal(res.body.returnUnit, 'lbs');
      done();
    });
  });
});