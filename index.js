var app = require('koa')();
var router = require('koa-router')();

router.get('/', function *(next) {
	this.body = 'get';
});

router.post('/', function *(next) {
	this.body = 'post';
});

router.put('/', function *(next) {
	this.body = 'put';
});

router.delete('/', function *(next) {
	this.body = 'delete';
});

app.use(router.routes());
app.listen(3000);