var app = require('koa')();
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:27017/test');
app.use(bodyParser());

var postSchema = mongoose.Schema({
	author: Number,
    name: String,
    text: String,
    allow: Boolean
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var Post = mongoose.model('Post', postSchema);

router.get('/posts', function *(next) {
	var posts = yield Post.find().exec();
    this.body = posts;
});

router.get('/posts/:id', function *(next) {
	var post = yield Post.findOne(this.params.id).exec();
    this.body = post;
});

router.post('/posts', function *(next) {
	var post = new Post(this.request.body);
	post.save(function (err) {
		if (err) 
			return console.error(err);
	});
});

router.put('/posts/:id', function *(next) {
	var query = {'_id': this.params.id};
	Post.findOneAndUpdate(query, this.request.body).exec();
});

router.delete('/posts/:id', function *(next) {
	Post.findOne({ _id: this.params.id }).remove().exec();
});

app.use(router.routes());
app.listen(3000);