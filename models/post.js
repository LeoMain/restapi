var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.ObjectId,
		ref : "User",
		required: true
	},
	name: {
		type: String,
		minlength: 5,
		required: true
	},
	text: {
		type: String,
		minlength: 10,
		maxlength: 1000,
		required: true
	},
	allow: Boolean
});

module.exports = mongoose.model('Post', postSchema);