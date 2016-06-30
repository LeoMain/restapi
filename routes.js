var router = require('koa-router')();
var rbac = require('koa-rbac');
var auth = require('./controllers/auth');
var post = require('./controllers/post');
var comment = require('./controllers/comment');
var config = require('./config');
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

router.use('/api/', jwt({ secret: config.secret }));
router.use(rbac(rbacOptions));

router.post('/signin', auth.auth);
router.post('/signup', auth.register);
router.get('/users', auth.showUsers);

router.get('/api/posts', rbac.allow(['read']), post.getAll);
router.get('/api/posts/:id', rbac.allow(['read']), post.get);
router.post('/api/posts', rbac.allow(['create']), post.add);
router.put('/api/posts/:id', rbac.allow(['update']), post.edit);
router.delete('/api/posts/:id', rbac.allow(['delete']), post.delete);

router.get('/api/posts/:id/comment', rbac.allow(['readComment']), comment.showComment);
router.post('/api/posts/:id/comment', rbac.allow(['createComment']), comment.add);
router.delete('/api/posts/:id/comment/:com', rbac.allow(['deleteComment']), comment.delete);

module.exports = router;