var router = require('koa-router')();
var auth = require('./controllers/auth');

router.post('/signin', auth.auth);
router.post('/signup', auth.register);

module.exports = router;