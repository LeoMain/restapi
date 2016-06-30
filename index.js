var app = require('koa')();
var router = require('./routes');
var config = require('./config');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser());
app.use(router.routes());

if (!module.parent) {
	app.listen(3000);
}

module.exports = app;