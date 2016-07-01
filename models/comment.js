var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	parentPost: {
		type: mongoose.Schema.ObjectId,
		ref : "Post",
		required: true
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref : "User",
		required: true
	},
	text: {
		type: String,
		minlength: 1,
		maxlength: 250,
		required: true
	},
	added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', commentSchema);