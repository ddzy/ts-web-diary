import * as Router from 'koa-router';

import homeController from './controller/home';
import articleController from './controller/article';
import meController from './controller/me';
import writeController from './controller/write';
import checkAuthController from './controller/checkAuth';
import detailsController from './controller/details';
import collectionController from './controller/collection';
import uploadController from './controller/upload';


// !! 重构router !!
import articleControllerNew from './controller/article/article';
import articleCreateControllerNew from './controller/article/create/articleCreate';
import articleInfoControllerNew from './controller/article/info/articleInfo';
import articleUpdateControllerNew from './controller/article/update/articleUpdate';
import articleDeleteControllerNew from './controller/article/delete/articleDelete';
import actionControllerNew from './controller/action/action';
import actionStarControllerNew from './controller/action/star/actionStar';
import searchControllerNew from './controller/search/search';
import pageControllerNew from './controller/page/page';
import pageHomeControllerNew from './controller/page/home/pageHome';
import pageDetailsControllerNew from './controller/page/details/pageDetails';
import loginControllerNew from './controller/login/login';
import registerControllerNew from './controller/register/register';


const router: Router = new Router({
  prefix: '/api',
});


// 装载路由
router
  .use('/home', homeController.routes(), homeController.allowedMethods())
  .use('/article', articleController.routes(), articleController.allowedMethods())
  .use('/me', meController.routes(), meController.allowedMethods())
  .use('/write', writeController.routes(), writeController.allowedMethods())
  .use('/checkauth', checkAuthController.routes(), checkAuthController.allowedMethods())
  .use('/details', detailsController.routes(), detailsController.allowedMethods())
  .use('/collection', collectionController.routes(), collectionController.allowedMethods())
  .use('/upload', uploadController.routes(), uploadController.allowedMethods());


// !! 重构路由 !!
router
  .use('/article', articleControllerNew.routes(), articleControllerNew.allowedMethods())
  .use('/article/create', articleCreateControllerNew.routes(), articleCreateControllerNew.allowedMethods())
  .use('/article/info', articleInfoControllerNew.routes(), articleInfoControllerNew.allowedMethods())
  .use('/article/update', articleUpdateControllerNew.routes(), articleUpdateControllerNew.allowedMethods())
  .use('/article/delete', articleDeleteControllerNew.routes(), articleDeleteControllerNew.allowedMethods())
  .use('/action', actionControllerNew.routes(), actionControllerNew.allowedMethods())
  .use('/action/star', actionStarControllerNew.routes(), actionStarControllerNew.allowedMethods())
  .use('/page', pageControllerNew.routes(), pageControllerNew.allowedMethods())
  .use('/page/home', pageHomeControllerNew.routes(), pageHomeControllerNew.allowedMethods())
  .use('/page/details', pageDetailsControllerNew.routes(), pageDetailsControllerNew.allowedMethods())
  .use('/search', searchControllerNew.routes(), searchControllerNew.allowedMethods())
  .use('/login', loginControllerNew.routes(), loginControllerNew.allowedMethods())
  .use('/register', registerControllerNew.routes(), registerControllerNew.allowedMethods())


export default router;