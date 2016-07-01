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
		var user = this.state.user._doc;
		this.request.body.author = user._id.
		var post = new Post(this.request.body);
		yield post.save();
		this.body = post;
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.edit = function *(next) {
	try {
		var user = this.state.user._doc;
		var post = yield Post.findOne({ _id: this.params.id }).exec();
		if (post.author != user._id) {
			throw new Error("Forbidden. This is not your post");
		}
		var query = {'_id': this.params.id};
		this.body = yield Post.findOneAndUpdate(query, this.request.body, {new: true}).exec();
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.like = function *(next) {
	try {
		var user = this.state.user._doc;
		var post = yield Post.findOne({ _id: this.params.id }).exec();
		var index = post.likes.indexOf(user._id);

		if (index != -1) {
			post.likes.splice(index, 1);
		} else {
			post.likes.push(user._id);
		}
		
		yield post.save();
		this.body = post;
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.delete = function *(next) {
	try {
		var user = this.state.user._doc;
		var post = yield Post.findOne({ _id: this.params.id }).exec();
		if (post.author != user._id) {
			throw new Error("Forbidden. This is not your post");
		}
		this.body = yield Post.findOne({ _id: this.params.id }).remove().exec();
	}
	catch (e) {
		this.body = e.message;
	}
};

module.exports = ctrl;