var router = require('koa-router')();
var post = require('./controllers/postcontroller');

router.get('/posts', post.getAll);
router.get('/posts/:id', post.get);
router.post('/posts', post.add);
router.put('/posts/:id', post.edit);
router.delete('/posts/:id', post.delete);

module.exports = router;