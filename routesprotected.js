var router = require('koa-router')();
var post = require('./controllers/post');

router.get('/api/posts', post.getAll);
router.get('/api/posts/:id', post.get);
router.post('/api/posts', post.add);
router.put('/api/posts/:id', post.edit);
router.delete('/api/posts/:id', post.delete);

module.exports = router;