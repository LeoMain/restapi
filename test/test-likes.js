var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').listen(3001);
var should = chai.should();
var Post = require('../models/post');
var mocha = require('mocha');
var coMocha = require('co-mocha');
chai.use(chaiHttp);


describe('Likes', function() {
	var user = {
		"name": "user2",
		"password": "user2"
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

	it('like on /api/posts/id/like PUT', function* (done) {
		var res = yield chai.request(server)
			.put('/api/posts/' + id + '/like')
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.likes.length.should.equal(1);
		done();
	});	

	it('dislike on /api/posts/id/like PUT', function* (done) {
		var res = yield chai.request(server)
			.put('/api/posts/' + id + '/like')
			.set("Authorization", 'Bearer '+ token);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.likes.length.should.equal(0);
		done();
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
});