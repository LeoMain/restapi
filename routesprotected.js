var post = require('./controllers/post');
var rbac = require('koa-rbac');

module.exports.register = function (router) {
	router.get('/api/posts', rbac.allow(['read']), post.getAll);
	router.get('/api/posts/:id', rbac.allow(['read']), post.get);
	router.post('/api/posts', rbac.allow(['create']), post.add);
	router.put('/api/posts/:id', rbac.allow(['update']), post.edit);
	router.delete('/api/posts/:id', rbac.allow(['delete']), post.delete);
};