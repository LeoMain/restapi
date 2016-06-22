var ctrl = {};
var Post = require('../models/post');

ctrl.getAll = function *(next) {
	try {
		this.body = yield Post.find().exec();
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.get = function *(next) {
	try {
		this.body = yield Post.findOne({ _id: this.params.id }).exec();
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.add = function *(next) {
	try {
		var post = new Post(this.request.body);
		yield post.save();
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.edit = function *(next) {
	try {
		var query = {'_id': this.params.id};
		Post.findOneAndUpdate(query, this.request.body).exec();
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.delete = function *(next) {
	try {
		Post.findOne({ _id: this.params.id }).remove().exec();
	}
	catch (e) {
		this.body = e.message;
	}
};

module.exports = ctrl;