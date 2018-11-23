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
const collectionController = require('./controller/collection');
const uploadController = require('./controller/upload');


// 装载路由
router
  .use('/api', homeController.routes(), homeController.allowedMethods())
  .use('/api/article', articleController.routes(), articleController.allowedMethods())
  .use('/api/login', loginController.routes(), loginController.allowedMethods())
  .use('/api/register', registerController.routes(), registerController.allowedMethods())
  .use('/api/me', meController.routes(), meController.allowedMethods())
  .use('/api/write', writeController.routes(), writeController.allowedMethods())
  .use('/api/checkauth', checkAuthController.routes(), checkAuthController.allowedMethods())
  .use('/api/details', detailsController.routes(), detailsController.allowedMethods())
  .use('/api/collection', collectionController.routes(), collectionController.allowedMethods())
  .use('/api/upload', uploadController.routes(), uploadController.allowedMethods());


module.exports = {
  router,
};