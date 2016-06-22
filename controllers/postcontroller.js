var ctrl = {};
var Post = require('../models/post');

ctrl.getAll = function *(next) {
	var posts = yield Post.find().exec();
	this.body = posts;
};

ctrl.get = function *(next) {
	var post = yield Post.findOne(this.params.id).exec();
	this.body = post;
};

ctrl.add = function *(next) {
	try {
		var post = new Post(this.request.body);
		yield post.save();
	}
	catch (e) {
		console.error(e);
	}
};

ctrl.edit = function *(next) {
	var query = {'_id': this.params.id};
	Post.findOneAndUpdate(query, this.request.body).exec();
};

ctrl.delete = function *(next) {
	Post.findOne({ _id: this.params.id }).remove().exec();
};

module.exports = ctrl;