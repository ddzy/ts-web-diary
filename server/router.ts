import * as Router from 'koa-router';


import articleController from './controller/article/article';
import articleCreateController from './controller/article/create/articleCreate';
import articleInfoController from './controller/article/info/articleInfo';
import articleUpdateController from './controller/article/update/articleUpdate';
import articleDeleteController from './controller/article/delete/articleDelete';

import actionController from './controller/action/action';
import actionStarController from './controller/action/star/actionStar';
import actionStarArticleController from './controller/action/star/article/actionStarArticle';
import actionStarPinController from './controller/action/star/pin/actionStarPin';
import actionAttentionController from './controller/action/attention/actionAttention';
import actionAttentionPeopleController from './controller/action/attention/people/actionAttentionPeople';
import actionAttentionTopicController from './controller/action/attention/topic/actionAttentionTopic';

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

// import collectionController from './controller/collection/collection';
// import collectionCreateController from './controller/collection/create/collectionCreate';
// import collectionUpdateController from './controller/collection/update/collectionUpdate';
// import collectionInfoController from './controller/collection/info/collectionInfo';
// import collectionDeleteController from './controller/collection/delete/collectionDelete';
import collectionController from './controller/collection/collection';
import collectionArticleController from './controller/collection/article/collectionArticle.ts';
import collectionArticleInfoController from './controller/collection/article/info/collectionArticleInfo';
import collectionArticleCreateController from './controller/collection/article/create/collectionArticleCreate';
import collectionArticleUpdateController from './controller/collection/article/update/collectionArticleUpdate';
import collectionPinController from './controller/collection/pin/collectionPin';
import collectionPinInfoController from './controller/collection/pin/info/collectionPinInfo';
import collectionPinCreateController from './controller/collection/pin/create/collectionPinCreate';
import collectionPinUpdateController from './controller/collection/pin/update/collectionPinUpdate';


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
import userInfoArticleController from './controller/user/info/article/userInfoArticle';
import userInfoPartialController from './controller/user/info/partial/userInfoPartial';
import userInfoPartialTrackController from './controller/user/info/partial/track/userInfoPartialTrack';
import userInfoPartialArticleController from './controller/user/info/partial/article/userInfoPartialArticle';

import notificationController from './controller/notification/notification';
import notificationUserController from './controller/notification/user/notificationUser';
import notificationUserFriendController from './controller/notification/user/friend/notificationUserFriend';
import notificationUserStarController from './controller/notification/user/star/notificationUserStar';
import notificationUserAttentionController from './controller/notification/user/attention/notificationUserAttention';
import notificationUserCollectionController from './controller/notification/user/collection/notificationUserCollection';
import notificationUserStarArticleController from './controller/notification/user/star/article/notificationUserStarArticle';
import notificationUserStarArticleCommentController from './controller/notification/user/star/article/comment/notificationUserStarArticleComment';
import notificationUserAttentionPeopleController from './controller/notification/user/attention/people/notificationUserAttentionPeople';
import notificationUserAttentionTopicController from './controller/notification/user/attention/topic/notificationUserAttentionTopic';
import notificationUserCollectionArticleController from './controller/notification/user/collection/article/notificationUserCollectionArticle';

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

import topicController from './controller/topic/topic';
import topicSelfController from './controller/topic/self/topicSelf';
import topicSelfInfoController from './controller/topic/self/info/topicSelfInfo';
import topicPinController from './controller/topic/pin/topicPin';
import topicPinInfoController from './controller/topic/pin/info/topicPinInfo';

import pinController from './controller/pin/pin';
import pinSelfController from './controller/pin/self/pinSelf';
import pinSelfInfoController from './controller/pin/self/info/pinSelfInfo';
import pinSelfCreateController from './controller/pin/self/create/pinSelfCreate';
import pinCommentController from './controller/pin/comment/pinComment';
import pinCommentInfoController from './controller/pin/comment/info/pinCommentInfo';
import pinCommentCreateController from './controller/pin/comment/create/pinCommentCreate';
import pinReplyController from './controller/pin/reply/pinReply';
import pinReplyInfoController from './controller/pin/reply/info/pinReplyInfo';
import pinReplyCreateController from './controller/pin/reply/create/pinReplyCreate';



const router: Router = new Router({
  prefix: '/api',
});


// !! 五级路由 !!
notificationUserStarArticleController
  .use('/comment', notificationUserStarArticleCommentController.routes(), notificationUserStarArticleCommentController.allowedMethods());


// !! 四级路由 !!
notificationUserStarController
  .use('/article', notificationUserStarArticleController.routes(), notificationUserStarArticleController.allowedMethods());
notificationUserAttentionController
  .use('/people', notificationUserAttentionPeopleController.routes(), notificationUserAttentionPeopleController.allowedMethods())
  .use('/topic', notificationUserAttentionTopicController.routes(), notificationUserAttentionTopicController.allowedMethods());
notificationUserCollectionController
  .use('/article', notificationUserCollectionArticleController.routes(), notificationUserCollectionArticleController.allowedMethods());
userInfoPartialController
  .use('/track', userInfoPartialTrackController.routes(), userInfoPartialTrackController.allowedMethods())
  .use('/article', userInfoPartialArticleController.routes(), userInfoPartialArticleController.allowedMethods());


// !! 三级路由 !!
commentArticleController
  .use('/create', commentArticleCreateController.routes(), commentArticleCreateController.allowedMethods())
  .use('/info', commentArticleInfoController.routes(), commentArticleInfoController.allowedMethods())
replyArticleController
  .use('/create', replyArticleCreateController.routes(), replyArticleCreateController.allowedMethods())
  .use('/info', replyArticleInfoController.routes(), replyArticleInfoController.allowedMethods())
actionStarController
  .use('/article', actionStarArticleController.routes(), actionStarArticleController.allowedMethods())
  .use('/pin', actionStarPinController.routes(), actionStarPinController.allowedMethods())
actionAttentionController
  .use('/people', actionAttentionPeopleController.routes(), actionAttentionPeopleController.allowedMethods())
  .use('/topic', actionAttentionTopicController.routes(), actionAttentionTopicController.allowedMethods())
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
  .use('/star', notificationUserStarController.routes(), notificationUserStarController.allowedMethods())
  .use('/attention', notificationUserAttentionController.routes(), notificationUserAttentionController.allowedMethods())
  .use('/collection', notificationUserCollectionController.routes(), notificationUserCollectionController.allowedMethods());
pinSelfController
  .use('/info', pinSelfInfoController.routes(), pinSelfInfoController.allowedMethods())
  .use('/create', pinSelfCreateController.routes(), pinSelfCreateController.allowedMethods());
pinReplyController
  .use('/info', pinReplyInfoController.routes(), pinReplyInfoController.allowedMethods())
  .use('/create', pinReplyCreateController.routes(), pinReplyCreateController.allowedMethods());
pinCommentController
  .use('/info', pinCommentInfoController.routes(), pinCommentInfoController.allowedMethods())
  .use('/create', pinCommentCreateController.routes(), pinCommentCreateController.allowedMethods());
topicSelfController
  .use('/info', topicSelfInfoController.routes(), topicSelfInfoController.allowedMethods());
topicPinController
  .use('/info', topicPinInfoController.routes(), topicPinInfoController.allowedMethods());
userInfoController
  .use('/account', userInfoAccountController.routes(), userInfoAccountController.allowedMethods())
  .use('/article', userInfoArticleController.routes(), userInfoArticleController.allowedMethods())
  .use('/partial', userInfoPartialController.routes(), userInfoPartialController.allowedMethods());
collectionArticleController
  .use('/info', collectionArticleInfoController.routes(), collectionArticleInfoController.allowedMethods())
  .use('/create', collectionArticleCreateController.routes(), collectionArticleCreateController.allowedMethods())
  .use('/update', collectionArticleUpdateController.routes(), collectionArticleUpdateController.allowedMethods());
collectionPinController
  .use('/info', collectionPinInfoController.routes(), collectionPinInfoController.allowedMethods())
  .use('/create', collectionPinCreateController.routes(), collectionPinCreateController.allowedMethods())
  .use('/update', collectionPinUpdateController.routes(), collectionPinUpdateController.allowedMethods());


// !! 二级路由 !!
articleController
  .use('/create', articleCreateController.routes(), articleCreateController.allowedMethods())
  .use('/info', articleInfoController.routes(), articleInfoController.allowedMethods())
  .use('/update', articleUpdateController.routes(), articleUpdateController.allowedMethods())
  .use('/delete', articleDeleteController.routes(), articleDeleteController.allowedMethods());
actionController
  .use('/star', actionStarController.routes(), actionStarController.allowedMethods())
  .use('/attention', actionAttentionController.routes(), actionAttentionController.allowedMethods());
pageController
  .use('/home', pageHomeController.routes(), pageHomeController.allowedMethods())
  .use('/details', pageDetailsController.routes(), pageDetailsController.allowedMethods())
commentController
  .use('/article', commentArticleController.routes(), commentArticleController.allowedMethods())
replyController
  .use('/article', replyArticleController.routes(), replyArticleController.allowedMethods())
collectionController
  // .use('/create', collectionCreateController.routes(), collectionCreateController.allowedMethods())
  // .use('/update', collectionUpdateController.routes(), collectionUpdateController.allowedMethods())
  // .use('/info', collectionInfoController.routes(), collectionInfoController.allowedMethods())
  // .use('/delete', collectionDeleteController.routes(), collectionDeleteController.allowedMethods())
  .use('/article', collectionArticleController.routes(), collectionArticleController.allowedMethods())
  .use('/pin', collectionPinController.routes(), collectionPinController.allowedMethods());
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
topicController
  .use('/self', topicSelfController.routes(), topicSelfController.allowedMethods())
  .use('/pin', topicPinController.routes(), topicPinController.allowedMethods());
pinController
  .use('/self', pinSelfController.routes(), pinSelfController.allowedMethods())
  .use('/comment', pinCommentController.routes(), pinCommentController.allowedMethods())
  .use('/reply', pinReplyController.routes(), pinReplyController.allowedMethods());



// !! 一级路由 !!
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
  .use('/auth', authController.routes(), authController.allowedMethods())
  .use('/topic', topicController.routes(), topicController.allowedMethods())
  .use('/pin', pinController.routes(), pinController.allowedMethods());


export default router;