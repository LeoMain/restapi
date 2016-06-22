var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index').listen(3000);
var should = chai.should();
var Post = require('../models/post');

chai.use(chaiHttp);


describe('Blobs', function() {
	it('get all posts on /posts GET', function(done) {
		chai.request(server)
			.get('/posts')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				done();
			});
	});

	it('get post on /posts/:id GET', function(done) {
		var post = new Post({
			"author": 1,
			"name": "Jack Nikolson",
			"text": "Some test message",
			"allow": false
		});

		post.save(function(err, data) {
			chai.request(server)
				.get('/posts/'+data.id)
				.end(function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					done();
				});
		});
	});

	it('add post on /posts POST', function(done) {
		var post = {
			"author": 1,
			"name": "Jack Nikolson",
			"text": "Some test message",
			"allow": false
		};

		chai.request(server)
			.post('/posts')
			.send(post)
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
	});

	it('edit post on /posts/:id PUT', function(done) {
		var post = {
			"author": 1,
			"name": "Anton Petrov",
			"text": "Some test message",
			"allow": false
		};

		chai.request(server)
			.get('/posts')
			.end(function(err, res){
				chai.request(server)
					.put('/posts/'+res.body[res.body.length-1]._id)
					.send(post)
					.end(function(err, res) {
						res.should.have.status(200);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.author.should.equal(1);
						res.body.name.should.equal("Anton Petrov");
						res.body.text.should.equal("Some test message");
						res.body.allow.should.equal(false);
						done();
					});
			});
	});

	it('delete post on /posts/:id DELETE', function(done) {
		chai.request(server)
			.get('/posts')
			.end(function(err, res){
				chai.request(server)
					.delete('/posts/'+res.body[res.body.length-1]._id)
					.end(function(err, res) {
						res.should.have.status(200);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.n.should.equal(1);
						done();
					});
			});
	});
});