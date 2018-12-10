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

const router: Router = new Router();


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


export default router;