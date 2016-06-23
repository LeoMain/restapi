var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').listen(3000);
var should = chai.should();
var Post = require('../models/post');
var mocha = require('mocha');
var coMocha = require('co-mocha');
chai.use(chaiHttp);


describe('Posts', function() {
	it('get all posts on /posts GET', function* (done) {
		var res = yield chai.request(server)
			.get('/posts');

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('array');
		done();
	});

	it('get post on /posts/:id GET', function* (done) {
		var post = new Post({
			"author": 1,
			"name": "Jack Nikolson",
			"text": "Some test message",
			"allow": false
		});

		yield post.save();
		var res = yield chai.request(server)
			.get('/posts/'+post.id);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		done();
	});

	it('add post on /posts POST', function* (done) {
		var post = {
			"author": 1,
			"name": "Jack Nikolson",
			"text": "Some test message",
			"allow": false
		};

		var res = yield chai.request(server)
			.post('/posts')
			.send(post);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		done();
	});

	it('edit post on /posts/:id PUT', function* (done) {
		var post = {
			"author": 1,
			"name": "Anton Petrov",
			"text": "Some test message",
			"allow": false
		};

		var posts = yield chai.request(server)
			.get('/posts');

		var res = yield chai.request(server)
			.put('/posts/'+posts.body[posts.body.length-1]._id)
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

	it('delete post on /posts/:id DELETE', function* (done) {
		var posts = yield chai.request(server)
			.get('/posts');

		var res = yield chai.request(server)
			.delete('/posts/'+posts.body[posts.body.length-1]._id);

		res.should.have.status(200);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.n.should.equal(1);
		done();
	});
});