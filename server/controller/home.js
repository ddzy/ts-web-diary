const koa = require('koa');
const Router = require('koa-router');

const home = new Router();


home.get('/', async (ctx, next) => {
  ctx.body = '<h1>Hello home</h1>';
});



module.exports = home;