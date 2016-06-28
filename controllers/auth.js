var ctrl = {};
var User = require('../models/user');
var config = require('../config');
var jwt = require('koa-jwt');

ctrl.register = function *(next) {
	try {
		var user = new User(this.request.body);
		yield user.save();
		this.body = user;
	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.auth = function *(next) {
	try {
		var user = yield User.findOne({ name: this.request.body.name }).exec();
		if (user.password != this.request.body.password)
			throw new Error("Wrong password");

		var token = jwt.sign(user, config.secret, { expiresIn: 86400000 });

		this.body = { token: token }

	}
	catch (e) {
		this.body = e.message;
	}
};

ctrl.showUsers = function *(next) {
	try {
		this.body = yield User.find({}, {password: 0, __v: 0, _id: 0}).exec();
	}
	catch (e) {
		this.body = e.message;
	}
};

module.exports = ctrl;