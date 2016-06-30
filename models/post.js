var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	author: {
		type: Number,
		min: 1,
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
	likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	allow: Boolean
});

module.exports = mongoose.model('Post', postSchema);