var ctrl = {};
var Comment = require('../models/comment');

ctrl.add = function *(next){
	try {		
		var user = this.state.user._doc;
		this.request.body.author = user._id;
		this.request.body.parentPost = this.params.id;
		var comment = new Comment(this.request.body);
		yield comment.save();
		this.body = comment;
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.delete = function *(next) {
	try {
		var user = this.state.user._doc;
		if (this.request.body.author == user._id) {
		this.body = yield Comment.findOne({ _id: this.params.com }).remove().exec();
	}
	else {this.body = "No delete Comment"};
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.showComment = function *(next) {
	try {
		this.body = yield Comment.find({parentPost : this.params.id});
	}
	catch (e) {
		this.body = e.message;
	}
};

module.exports = ctrl;