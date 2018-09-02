const Router = require('koa-router');

const router = new Router();

// 子路由
const homeController = require('./controller/home');
const articleController = require('./controller/article');
const loginController = require('./controller/login');
const registerController = require('./controller/register');
const meController = require('./controller/me');
const writeController = require('./controller/write');
const checkAuthController = require('./controller/checkAuth');
const detailsController = require('./controller/details');


// 装载路由
router
  .use('/', homeController.routes(), homeController.allowedMethods())
  .use('/article', articleController.routes(), articleController.allowedMethods())
  .use('/login', loginController.routes(), loginController.allowedMethods())
  .use('/register', registerController.routes(), registerController.allowedMethods())
  .use('/me', meController.routes(), meController.allowedMethods())
  .use('/write', writeController.routes(), writeController.allowedMethods())
  .use('/checkauth', checkAuthController.routes(), checkAuthController.allowedMethods())
  .use('/details', detailsController.routes(), detailsController.allowedMethods());


module.exports = {
  router,
};