var auth = require('./controllers/auth');

module.exports.register = function (router) {
	router.post('/signin', auth.auth);
	router.post('/signup', auth.register);
	router.get('/users', auth.showUsers);
};