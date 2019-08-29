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
import actionStarArticleControllerNew from './controller/action/star/article/actionStarArticle';
import actionStarCommentControllerNew from './controller/action/star/comment/actionStarComment';
import actionStarReplyControllerNew from './controller/action/star/reply/actionStarReply';
import actionAvatarControllerNew from './controller/action/avatar/actionAvatar';
import actionFollowControllerNew from './controller/action/follow/actionFollow';
import searchControllerNew from './controller/search/search';
import pageControllerNew from './controller/page/page';
import pageHomeControllerNew from './controller/page/home/pageHome';
import pageDetailsControllerNew from './controller/page/details/pageDetails';
import loginControllerNew from './controller/login/login';
import registerControllerNew from './controller/register/register';
import commentControllerNew from './controller/comment/comment';
import commentArticleControllerNew from './controller/comment/article/commentArticle';
import commentArticleCreateControllerNew from './controller/comment/article/create/commentArticleCreate';
import commentArticleInfoControllerNew from './controller/comment/article/info/commentArticleInfo';
import replyControllerNew from './controller/reply/reply';
import replyArticleControllerNew from './controller/reply/article/replyArticle';
import replyArticleCreateControllerNew from './controller/reply/article/create/replyArticleCreate';
import replyArticleInfoControllerNew from './controller/reply/article/info/replyArticleInfo';
import collectionControllerNew from './controller/collection/collection';
import collectionCreateControllerNew from './controller/collection/create/collectionCreate';
import collectionUpdateControllerNew from './controller/collection/update/collectionUpdate';
import collectionInfoControllerNew from './controller/collection/info/collectionInfo';
import collectionDeleteControllerNew from './controller/collection/delete/collectionDelete';
import uploadControllerNew from './controller/upload/upload';
import chatController from './controller/chat/chat';
import chatInfoController from './controller/chat/info/chatInfo';
import chatCreateController from './controller/chat/create/chatCreate';
import statusController from './controller/status/status';
import statusCreateController from './controller/status/create/statusCreate';
import statusInfoController from './controller/status/info/statusInfo';
import userController from './controller/user/user';
import userInfoController from './controller/user/info/userInfo';

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


// !! 三级路由 !!
commentArticleControllerNew
  .use('/create', commentArticleCreateControllerNew.routes(), commentArticleCreateControllerNew.allowedMethods())
  .use('/info', commentArticleInfoControllerNew.routes(), commentArticleInfoControllerNew.allowedMethods())
replyArticleControllerNew
  .use('/create', replyArticleCreateControllerNew.routes(), replyArticleCreateControllerNew.allowedMethods())
  .use('/info', replyArticleInfoControllerNew.routes(), replyArticleInfoControllerNew.allowedMethods())
actionStarControllerNew
  .use('/article', actionStarArticleControllerNew.routes(), actionStarArticleControllerNew.allowedMethods())
  .use('/comment', actionStarCommentControllerNew.routes(), actionStarCommentControllerNew.allowedMethods())
  .use('/reply', actionStarReplyControllerNew.routes(), actionStarReplyControllerNew.allowedMethods())


// !! 二级路由 !!
articleControllerNew
  .use('/create', articleCreateControllerNew.routes(), articleCreateControllerNew.allowedMethods())
  .use('/info', articleInfoControllerNew.routes(), articleInfoControllerNew.allowedMethods())
  .use('/update', articleUpdateControllerNew.routes(), articleUpdateControllerNew.allowedMethods())
  .use('/delete', articleDeleteControllerNew.routes(), articleDeleteControllerNew.allowedMethods());
actionControllerNew
  .use('/star', actionStarControllerNew.routes(), actionStarControllerNew.allowedMethods())
  .use('/avatar', actionAvatarControllerNew.routes(), actionAvatarControllerNew.allowedMethods())
  .use('/follow', actionFollowControllerNew.routes(), actionFollowControllerNew.allowedMethods())
pageControllerNew
  .use('/home', pageHomeControllerNew.routes(), pageHomeControllerNew.allowedMethods())
  .use('/details', pageDetailsControllerNew.routes(), pageDetailsControllerNew.allowedMethods())
commentControllerNew
  .use('/article', commentArticleControllerNew.routes(), commentArticleControllerNew.allowedMethods())
replyControllerNew
  .use('/article', replyArticleControllerNew.routes(), replyArticleControllerNew.allowedMethods())
collectionControllerNew
  .use('/create', collectionCreateControllerNew.routes(), collectionCreateControllerNew.allowedMethods())
  .use('/update', collectionUpdateControllerNew.routes(), collectionUpdateControllerNew.allowedMethods())
  .use('/info', collectionInfoControllerNew.routes(), collectionInfoControllerNew.allowedMethods())
  .use('/delete', collectionDeleteControllerNew.routes(), collectionDeleteControllerNew.allowedMethods())
chatController
  .use('/info', chatInfoController.routes(), chatInfoController.allowedMethods())
  .use('/create', chatCreateController.routes(), chatCreateController.allowedMethods());
statusController
  .use('/create', statusCreateController.routes(), statusCreateController.allowedMethods())
  .use('/info', statusInfoController.routes(), statusInfoController.allowedMethods());
userController
  .use('/info', userInfoController.routes(), userInfoController.allowedMethods());


// !! 重构路由 一级路由 !!
router
  .use('/article', articleControllerNew.routes(), articleControllerNew.allowedMethods())
  .use('/action', actionControllerNew.routes(), actionControllerNew.allowedMethods())
  .use('/page', pageControllerNew.routes(), pageControllerNew.allowedMethods())
  .use('/search', searchControllerNew.routes(), searchControllerNew.allowedMethods())
  .use('/login', loginControllerNew.routes(), loginControllerNew.allowedMethods())
  .use('/register', registerControllerNew.routes(), registerControllerNew.allowedMethods())
  .use('/comment', commentControllerNew.routes(), commentControllerNew.allowedMethods())
  .use('/reply', replyControllerNew.routes(), replyControllerNew.allowedMethods())
  .use('/collection', collectionControllerNew.routes(), collectionControllerNew.allowedMethods())
  .use('/upload', uploadControllerNew.routes(), uploadControllerNew.allowedMethods())
  .use('/chat', chatController.routes(), chatController.allowedMethods())
  .use('/status', statusController.routes(), statusController.allowedMethods())
  .use('/user', userController.routes(), userController.allowedMethods());


export default router;