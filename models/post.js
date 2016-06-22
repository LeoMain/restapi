var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	author: Number,
	name: String,
	text: String,
	allow: Boolean
});

module.exports = mongoose.model('Post', postSchema);