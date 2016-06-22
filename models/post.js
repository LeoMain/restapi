var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	author: {
		type: Number,
		min: 1,
		required: true
	},
	name: {
		type: String,
		minlength: 10,
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