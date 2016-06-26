var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').listen(3000);
var should = chai.should();
var User = require('../models/user');
var mocha = require('mocha');
var coMocha = require('co-mocha');
chai.use(chaiHttp);


describe('Auth', function() {
	var user = {
		"name": "Boris4",
		"password": "Boris4"
	};

	var token;

	it('user registration /signup POST', function* (done) {
		var res = yield chai.request(server)
			.post('/signup')
			.send(user);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.name.should.equal(user.name);
		res.body.password.should.equal(user.password);
		done();
	});

	it('user authentication /signin POST', function* (done) {
		var res = yield chai.request(server)
			.post('/signin')
			.send(user);

		res.should.be.json;
		res.body.should.have.property("token");
		token = res.body.token;
		done();
	});

	it('get all posts for guest', function* (done) {
		try {
			yield chai.request(server)
				.get('/api/posts');
		} 
		catch (e){
			e.should.have.status(401);
			done();
		}
	});

	it('get all posts for user', function* (done) {
		var res = yield chai.request(server)
			.get('/api/posts')
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('array');
		done();
	});
});