var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').listen(3001);
var should = chai.should();
var Post = require('../models/post');
var mocha = require('mocha');
var coMocha = require('co-mocha');
chai.use(chaiHttp);


describe('Posts', function() {
	var user = {
		"name": "admin",
		"password": "admin"
	};

	var token, id;

	it('user authentication /signin POST', function* (done) {
		var res = yield chai.request(server)
			.post('/signin')
			.send(user);

		res.should.be.json;
		res.body.should.have.property("token");
		token = res.body.token;
		done();
	});

	it('add post on /api/posts POST', function* (done) {
		var post = {
			"author": 1,
			"name": "Jack Nikolson",
			"text": "Some test message",
			"allow": false
		};

		var res = yield chai.request(server)
			.post('/api/posts')
			.set("Authorization", 'Bearer '+ token)
			.send(post);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		id = res.body._id;
		done();
	});

	it('add post UNAUTHORIZED on /api/posts POST', function* (done) {
		var post = {
			"author": 1,
			"name": "Jack Nikolson",
			"text": "Some test message",
			"allow": false
		};

		try {
			yield chai.request(server)
				.post('/api/posts')
				.send(post);
		}
		catch (e){
			e.should.have.status(401);
			done();
		}
	});

	it('get all posts on /api/posts GET', function* (done) {
		var res = yield chai.request(server)
			.get('/api/posts')
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('array');
		done();
	});

	it('get all posts UNAUTHORIZED on /api/posts GET', function* (done) {
		try {
			yield chai.request(server)
				.get('/api/posts');
		}
		catch (e){
			e.should.have.status(401);
			done();
		}
	});

	it('get post on /api/posts/:id GET', function* (done) {
		var res = yield chai.request(server)
			.get('/api/posts/' + id)
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		done();
	});

	it('get post UNAUTHORIZED on /api/posts/:id GET', function* (done) {
		try {
			yield chai.request(server)
				.get('/api/posts/' + id);
		}
		catch (e){
			e.should.have.status(401);
			done();
		}
	});

	it('edit post on /api/posts/:id PUT', function* (done) {
		var post = {
			"author": 1,
			"name": "Anton Petrov",
			"text": "Some test message",
			"allow": false
		};

		var res = yield chai.request(server)
			.put('/api/posts/' + id)
			.set("Authorization", 'Bearer '+ token)
			.send(post);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.author.should.equal(1);
		res.body.name.should.equal("Anton Petrov");
		res.body.text.should.equal("Some test message");
		res.body.allow.should.equal(false);
		done();
	});

	it('edit post UNAUTHORIZED on /api/posts/:id PUT', function* (done) {
		var post = {
			"author": 1,
			"name": "Anton Petrov",
			"text": "Some test message",
			"allow": false
		};

		try {
			yield chai.request(server)
				.put('/api/posts/' + id)
				.send(post);
		}
		catch (e){
			e.should.have.status(401);
			done();
		}
	});

	it('delete post on /api/posts/:id DELETE', function* (done) {
		var res = yield chai.request(server)			
			.delete('/api/posts/' + id)
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.n.should.equal(1);
		done();
	});

	it('delete post UNAUTHORIZED on /api/posts/:id DELETE', function* (done) {
		try {
			yield chai.request(server)
				.delete('/api/posts/' + id);
		}
		catch (e){
			e.should.have.status(401);
			done();
		}
	});
});