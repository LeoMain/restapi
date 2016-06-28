var app = require('koa')();
var router = require('koa-router')();
var config = require('./config');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
var jwt = require('koa-jwt');
var rbac = require('koa-rbac');
var rules = require('./rbac-rules');
var customProvider = require('./rbac-provider');
const rbacOptions = {
	rbac: new rbac.RBAC({
		provider: new customProvider(rules)
	}),
	identity: function (ctx) { 
		return ctx && ctx.state.user;
	}
}; 

mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser());
require('./routes').register(router);
router.use(jwt({ secret: config.secret }));
router.use(rbac(rbacOptions));
require('./routesprotected').register(router);
app.use(router.routes());

if (!module.parent) {
	app.listen(3000);
}

module.exports = app;