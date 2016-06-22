var app = module.exports = require('koa')();
var router = require('./routes');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser());
app.use(router.routes());

if (!module.parent) {
	app.listen(3000);
}