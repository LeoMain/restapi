var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').listen(3001);
var should = chai.should();
var Comment = require('../models/comment');
var mocha = require('mocha');
var coMocha = require('co-mocha');
chai.use(chaiHttp);

describe('Comments', function() {
	var user = {
		"name": "Valeriy",
		"password": "user"  
	};

	var token, id, com;

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
			"name": "userOne",
			"text": "qwertyuiop",
			"allow": true
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

	it('add comment on /api/posts/:id/commetn POST', function* (done) {
		var comment = {
			"text": "Test comment"
		};

		var res = yield chai.request(server)
			.post('/api/posts/' + id + '/comment')
			.set("Authorization", 'Bearer '+ token)
			.send(comment);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		com = res.body._id;
		done();
	});

	it('add comment UNAUTHORIZED on /api/posts/:id/commetn POST', function* (done) {
		var comment = {
			"text": "Test comment"
		};

		try {
			yield chai.request(server)
			.post('/api/posts/' + id + '/comment')
			.send(comment);
		}
		catch (e) {
			e.should.have.status(401);
			done();
		};
	});

	it('get comments on /api/posts/:id/comment GET', function* (done) {
		var res = yield chai.request(server)
			.get('/api/posts/' + id + '/comment')
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('array');
		done();
	});

	it('get comments UNAUTHORIZED on /api/posts/:id/comment GET', function* (done) {
		try {
			yield chai.request(server)
			.get('/api/posts/' + id + '/comment')
		}
		catch (e) {
			e.should.have.status(401);
			done();
		};
	});


	it('delete comment on /api/posts/:id/comment/:com DELETE', function* (done) {
		var res = yield chai.request(server)			
			.delete('/api/posts/' + id + '/comment/' + com)
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.n.should.equal(1);
		done();

	});

	it('delete comment UNAUTHORIZED on /api/posts/:id/comment/:com DELETE', function* (done) {
		try {
			yield chai.request(server)
				.delete('/api/posts/' + id + '/comment/' + com);
		}
		catch (e){
			e.should.have.status(401);
			done();
		}
	});

});