import * as Router from 'koa-router';


// !! 重构router !!
import articleController from './controller/article/article';
import articleCreateController from './controller/article/create/articleCreate';
import articleInfoController from './controller/article/info/articleInfo';
import articleUpdateController from './controller/article/update/articleUpdate';
import articleDeleteController from './controller/article/delete/articleDelete';
import actionController from './controller/action/action';
import actionStarController from './controller/action/star/actionStar';
import actionStarArticleController from './controller/action/star/article/actionStarArticle';
import actionStarCommentController from './controller/action/star/comment/actionStarComment';
import actionStarReplyController from './controller/action/star/reply/actionStarReply';
import actionAvatarController from './controller/action/avatar/actionAvatar';
import actionFollowController from './controller/action/follow/actionFollow';
import actionFriendController from './controller/action/friend/actionFriend';
import searchController from './controller/search/search';
import pageController from './controller/page/page';
import pageHomeController from './controller/page/home/pageHome';
import pageDetailsController from './controller/page/details/pageDetails';
import loginController from './controller/login/login';
import registerController from './controller/register/register';
import commentController from './controller/comment/comment';
import commentArticleController from './controller/comment/article/commentArticle';
import commentArticleCreateController from './controller/comment/article/create/commentArticleCreate';
import commentArticleInfoController from './controller/comment/article/info/commentArticleInfo';
import replyController from './controller/reply/reply';
import replyArticleController from './controller/reply/article/replyArticle';
import replyArticleCreateController from './controller/reply/article/create/replyArticleCreate';
import replyArticleInfoController from './controller/reply/article/info/replyArticleInfo';
import collectionController from './controller/collection/collection';
import collectionCreateController from './controller/collection/create/collectionCreate';
import collectionUpdateController from './controller/collection/update/collectionUpdate';
import collectionInfoController from './controller/collection/info/collectionInfo';
import collectionDeleteController from './controller/collection/delete/collectionDelete';
import uploadController from './controller/upload/upload';
import statusController from './controller/status/status';
import statusCreateController from './controller/status/create/statusCreate';
import statusInfoController from './controller/status/info/statusInfo';
import statusUpdateController from './controller/status/update/statusUpdate';
import userController from './controller/user/user';
import userInfoController from './controller/user/info/userInfo';
import userCreateController from './controller/user/create/userCreate';
import userUpdateController from './controller/user/update/userUpdate';
import userInfoAccountController from './controller/user/info/account/userInfoAccount';
import notificationController from './controller/notification/notification';
import notificationUserController from './controller/notification/user/notificationUser';
import notificationUserFriendController from './controller/notification/user/friend/notificationUserFriend';
import notificationUserStarController from './controller/notification/user/star/notificationUserStar';
import notificationUserStarArticleController from './controller/notification/user/star/article/notificationUserStarArticle';
import notificationUserStarArticleCommentController from './controller/notification/user/star/article/comment/notificationUserStarArticleComment';
import chatController from './controller/chat/chat';
import chatSingleController from './controller/chat/single/chatSingle';
import chatSingleInfoController from './controller/chat/single/info/chatSingleInfo';
import chatSingleCreateController from './controller/chat/single/create/chatSingleCreate';
import chatCommonController from './controller/chat/common/chatCommon';
import chatCommonInfoController from './controller/chat/common/info/chatCommonInfo';
import chatGroupController from './controller/chat/group/chatGroup';
import chatGroupCreateController from './controller/chat/group/create/chatGroupCreate';
import chatGroupInfoController from './controller/chat/group/info/chatGroupInfo';
import authController from './controller/auth/Auth';
import authGithubController from './controller/auth/github/authGithub';
import authAppController from './controller/auth/app/authApp';


const router: Router = new Router({
  prefix: '/api',
});


// !! 五级路由 !!
notificationUserStarArticleController
  .use('/comment', notificationUserStarArticleCommentController.routes(), notificationUserStarArticleCommentController.allowedMethods());


// !! 四级路由 !!
userInfoController
  .use('/account', userInfoAccountController.routes(), userInfoAccountController.allowedMethods())
notificationUserStarController
  .use('/article', notificationUserStarArticleController.routes(), notificationUserStarArticleController.allowedMethods());


// !! 三级路由 !!
commentArticleController
  .use('/create', commentArticleCreateController.routes(), commentArticleCreateController.allowedMethods())
  .use('/info', commentArticleInfoController.routes(), commentArticleInfoController.allowedMethods())
replyArticleController
  .use('/create', replyArticleCreateController.routes(), replyArticleCreateController.allowedMethods())
  .use('/info', replyArticleInfoController.routes(), replyArticleInfoController.allowedMethods())
actionStarController
  .use('/article', actionStarArticleController.routes(), actionStarArticleController.allowedMethods())
  .use('/comment', actionStarCommentController.routes(), actionStarCommentController.allowedMethods())
  .use('/reply', actionStarReplyController.routes(), actionStarReplyController.allowedMethods());
chatSingleController
  .use('/info', chatSingleInfoController.routes(), chatSingleInfoController.allowedMethods())
  .use('/create', chatSingleCreateController.routes(), chatSingleCreateController.allowedMethods());
chatGroupController
  .use('/info', chatGroupInfoController.routes(), chatGroupInfoController.allowedMethods())
  .use('/create', chatGroupCreateController.routes(), chatGroupCreateController.allowedMethods());
chatCommonController
  .use('/info', chatCommonInfoController.routes(), chatCommonInfoController.allowedMethods());
notificationUserController
  .use('/friend', notificationUserFriendController.routes(), notificationUserFriendController.allowedMethods())
  .use('/star', notificationUserStarController.routes(), notificationUserStarController.allowedMethods());


// !! 二级路由 !!
articleController
  .use('/create', articleCreateController.routes(), articleCreateController.allowedMethods())
  .use('/info', articleInfoController.routes(), articleInfoController.allowedMethods())
  .use('/update', articleUpdateController.routes(), articleUpdateController.allowedMethods())
  .use('/delete', articleDeleteController.routes(), articleDeleteController.allowedMethods());
actionController
  .use('/star', actionStarController.routes(), actionStarController.allowedMethods())
  .use('/avatar', actionAvatarController.routes(), actionAvatarController.allowedMethods())
  .use('/follow', actionFollowController.routes(), actionFollowController.allowedMethods())
  .use('/friend', actionFriendController.routes(), actionFriendController.allowedMethods())
pageController
  .use('/home', pageHomeController.routes(), pageHomeController.allowedMethods())
  .use('/details', pageDetailsController.routes(), pageDetailsController.allowedMethods())
commentController
  .use('/article', commentArticleController.routes(), commentArticleController.allowedMethods())
replyController
  .use('/article', replyArticleController.routes(), replyArticleController.allowedMethods())
collectionController
  .use('/create', collectionCreateController.routes(), collectionCreateController.allowedMethods())
  .use('/update', collectionUpdateController.routes(), collectionUpdateController.allowedMethods())
  .use('/info', collectionInfoController.routes(), collectionInfoController.allowedMethods())
  .use('/delete', collectionDeleteController.routes(), collectionDeleteController.allowedMethods())
chatController
  .use('/single', chatSingleController.routes(), chatSingleController.allowedMethods())
  .use('/common', chatCommonController.routes(), chatCommonController.allowedMethods())
  .use('/group', chatGroupController.routes(), chatGroupController.allowedMethods());
statusController
  .use('/create', statusCreateController.routes(), statusCreateController.allowedMethods())
  .use('/info', statusInfoController.routes(), statusInfoController.allowedMethods())
  .use('/update', statusUpdateController.routes(), statusUpdateController.allowedMethods());
userController
  .use('/info', userInfoController.routes(), userInfoController.allowedMethods())
  .use('/create', userCreateController.routes(), userCreateController.allowedMethods())
  .use('/update', userUpdateController.routes(), userUpdateController.allowedMethods());
notificationController
  .use('/user', notificationUserController.routes(), notificationUserController.allowedMethods());
authController
  .use('/github', authGithubController.routes(), authGithubController.allowedMethods())
  .use('/app', authAppController.routes(), authAppController.allowedMethods());


// !! 重构路由 一级路由 !!
router
  .use('/article', articleController.routes(), articleController.allowedMethods())
  .use('/action', actionController.routes(), actionController.allowedMethods())
  .use('/page', pageController.routes(), pageController.allowedMethods())
  .use('/search', searchController.routes(), searchController.allowedMethods())
  .use('/login', loginController.routes(), loginController.allowedMethods())
  .use('/register', registerController.routes(), registerController.allowedMethods())
  .use('/comment', commentController.routes(), commentController.allowedMethods())
  .use('/reply', replyController.routes(), replyController.allowedMethods())
  .use('/collection', collectionController.routes(), collectionController.allowedMethods())
  .use('/upload', uploadController.routes(), uploadController.allowedMethods())
  .use('/chat', chatController.routes(), chatController.allowedMethods())
  .use('/status', statusController.routes(), statusController.allowedMethods())
  .use('/user', userController.routes(), userController.allowedMethods())
  .use('/notification', notificationController.routes(), notificationController.allowedMethods())
  .use('/auth', authController.routes(), authController.allowedMethods());


export default router;