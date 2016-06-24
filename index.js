var app = module.exports = require('koa')();
var router = require('./routes');
var routerprotected = require('./routesprotected');
var config = require('./config');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
var jwt = require('koa-jwt');
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser());
app.use(router.routes());
routerprotected.use(jwt({ secret: config.secret }));
app.use(routerprotected.routes());

if (!module.parent) {
	app.listen(3000);
}