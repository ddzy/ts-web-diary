import * as Router from 'koa-router';
import homeController from './controller/home';
import articleController from './controller/article';
import loginController from './controller/login';
import registerController from './controller/register';
import meController from './controller/me';
import writeController from './controller/write';
import checkAuthController from './controller/checkAuth';
import detailsController from './controller/details';
import collectionController from './controller/collection';
import uploadController from './controller/upload';

const router: Router = new Router({
  prefix: '/api',
});


// 装载路由
router
  .use('/home', homeController.routes(), homeController.allowedMethods())
  .use('/article', articleController.routes(), articleController.allowedMethods())
  .use('/login', loginController.routes(), loginController.allowedMethods())
  .use('/register', registerController.routes(), registerController.allowedMethods())
  .use('/me', meController.routes(), meController.allowedMethods())
  .use('/write', writeController.routes(), writeController.allowedMethods())
  .use('/checkauth', checkAuthController.routes(), checkAuthController.allowedMethods())
  .use('/details', detailsController.routes(), detailsController.allowedMethods())
  .use('/collection', collectionController.routes(), collectionController.allowedMethods())
  .use('/upload', uploadController.routes(), uploadController.allowedMethods());


export default router;