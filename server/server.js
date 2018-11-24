const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');
const koaStatic = require('koa-static');
const unless = require('koa-unless');
const cors = require('koa-cors');

const path = require('path');

const { SECRET_FOR_TOKEN } = require('./constants/constants');
const { router } = require('./router');

const app = new Koa();


app.use(cors({
  maxAge: 60 * 60 * 24,
}));
app.use(bodyParser());


// token 拦截
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: -1,
        isAuth: false,
        message: '没有权限访问!'
      };
    }else {
      throw err;
    }
  });
});



app.use(koaJwt({ secret: SECRET_FOR_TOKEN }).unless({
  path: [
    /^\/api\/login/, 
    /^\/api\/register/,
    /^\/api\/article/,
    /^\/api\/details/,
    /^\/images/, 
    /^\/api\/details\/mimicat\.ico/,
    /^\/api\/edit\/mimicat\.ico/,
    /^\/api\/collection\/mimicat\.ico/,
  ],
}))



app.use(koaStatic(
  path.join(__dirname, './static'),
  { maxage: 0 },
));


// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(8888);
  