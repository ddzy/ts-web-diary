import * as mongoose from 'mongoose';
import {
  ObjectId,
} from 'bson';

import User from './user/userModel';
import Posts from './posts/postsModel';
import Comments from './comments/commentsModel';
import Replys from './replys/replysModel';
// import Collections from './collections/collectionsModel';
import CollectionArticle from './collection/article/collectionArticleModel';
import Followers from './followers/followersModel';
import Attentions from './attentions/attentionsModel';
import AttentionUsers from './attentions/attention_users/attentionUsersModel';
import AttentionTopics from './attentions/attention_topics/attentionTopicsModel';
import Chat from './chat/chatModel';
import ChatSingle from './chat/single/chatSingleModel';
import ChatSingleMember from './chat/single/member/chatSingleMemberModel';
import ChatSingleMessage from './chat/single/message/chatSingleMessageModel';
import ChatGroup from './chat/group/chatGroupModel';
import ChatGroupMember from './chat/group/member/chatGroupMemberModel';
import ChatGroupMessage from './chat/group/message/chatGroupMessageModel';
import ChatStatus from './chat/status/chatStatusModel';
import ChatMemory from './chat/memory/chatMemoryModel';
import NotificationUserFriendRequest from './notification/user/friend/request/notificationUserFriendRequestModel';
import NotificationUserFriendAgree from './notification/user/friend/agree/notificationUserFriendAgreeModel';
import NotificationUserFriendRefuse from './notification/user/friend/refuse/notificationUserFriendRefuseModel';
import OAuthGithub from './oauth/github/oauthGithubModel';
import Topic from './topic/topicModel';
import Pin from './pin/pinModel';
import PinComment from './pin/comment/pinCommentModel';
import PinReply from './pin/reply/pinReplyModel';


import {
  INotificationUserFriendRequestModelProps,
} from './notification/user/friend/request/notificationUserFriendRequestModel.types';
import {
  INotificationUserFriendAgreeModelProps,
} from './notification/user/friend/agree/notificationUserFriendAgreeModel.types';
import {
  INotificationUserFriendRefuseModelProps,
} from './notification/user/friend/refuse/notificationUserFriendRefuseModel.types';
import {
  INotificationUserStarArticleProps,
} from './notification/user/star/article/notificationUserStarArticleModel.types';
import {
  INotificationUserStarPinProps,
} from './notification/user/star/pin/notificationUserStarPinModel.types';
import {
  INotificationUserAttentionPeopleProps,
} from './notification/user/attention/people/notificationUserAttentionPeople.types';

import {
  ITrackStarArticleProps,
} from './track/star/article/self/trackStarArticleSelfModel.types';
import {
  ITrackStarPinProps,
} from './track/star/pin/self/trackStarPinSelfModel.types';
import {
  ITrackAttentionTopicProps,
} from './track/attention/topic/trackAttentionTopicModel.types';
import {
  ITrackAttentionPeopleProps,
} from './track/attention/people/trackAttentionPeopleModel.types';
import {
  ITrackCreateArticleProps,
} from './track/create/article/trackCreateArticleModel.types';
import {
  ITrackCreatePinProps,
} from './track/create/pin/trackCreatePinModel.types';


mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost:27017/web-diary-log',
  { useNewUrlParser: true },
);


/**
 * 转化为ObjectId
 * @param id id值
 */
function changeId(
  id: string,
): ObjectId {
  return mongoose.Types.ObjectId(id);
}


export {
  changeId,
  User,
  Posts,
  Comments,
  Replys,
  // Collections,
  Attentions,
  Followers,
  AttentionUsers,
  AttentionTopics,
  Chat,
  ChatSingle,
  ChatSingleMember,
  ChatSingleMessage,
  ChatGroup,
  ChatGroupMember,
  ChatGroupMessage,
  ChatStatus,
  ChatMemory,
  NotificationUserFriendRequest,
  NotificationUserFriendAgree,
  NotificationUserFriendRefuse,
  OAuthGithub,
  Topic,
  Pin,
  PinComment,
  PinReply,
  CollectionArticle,

  // ? 通知
  INotificationUserFriendRequestModelProps,
  INotificationUserFriendAgreeModelProps,
  INotificationUserFriendRefuseModelProps,
  INotificationUserStarArticleProps,
  INotificationUserStarPinProps,
  INotificationUserAttentionPeopleProps,

  // ? 足迹
  ITrackStarArticleProps,
  ITrackStarPinProps,
  ITrackAttentionTopicProps,
  ITrackAttentionPeopleProps,
  ITrackCreateArticleProps,
  ITrackCreatePinProps,
};