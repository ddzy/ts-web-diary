/**
 * @description 基本的数据接口
 * @description 与后台数据库保持一致
 */


/**
 * @description 用户的基本信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicUserInfo {
  _id: string;
  username: string;
  userpwd: string;
  usergender: string;
  useravatar: string;
  profile_cover_img: string;
  address: string;
  website: string;
  introduction: string;
  job: string;
  education: string;
  bind_third_party: {
    github: {
      type: number,
    },
  };
  collections: IBasicCollectionInfo[];
  articles: IBasicArticleInfo[];
  attention: {
    users: IBasicUserInfo[],
    topics: IBasicTopicInfo[],
  };
  followers: IBasicUserInfo[];
  friends: IBasicUserInfo[];
  chat_memory: IBasicChatMemoryInfo[];
  notifications: IBasicNotificationInfo[];
  activities: IBasicActivityInfo[];
  tracks: IBasicTrackInfo[];
  pins: IBasicPinInfo[];

  create_time: number;
  update_time: number;
};

/* ---------------------------------------------- */

/**
 * @description 用户文章收藏夹信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/13
 */
export interface IBasicCollectionInfo {
  _id: string;
  author: IBasicUserInfo;
  name: string;
  description: string;
  cover_img: string;
  followers: IBasicUserInfo[];
  watchers: IBasicUserInfo[];
  articles: IBasicArticleInfo[];
  create_time: number;
  update_time: number;
};

/* ---------------------------------------------- */

/**
 * @description 文章信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/14
 */
export interface IBasicArticleInfo {
  _id: string;
  author: IBasicUserInfo;
  comments: IBasicArticleCommentInfo[];
  cover_img: string;
  mode: string;
  type: string;
  title: string;
  description: string;
  content: string;
  tag: string;
  watched_user: IBasicUserInfo[];
  collected_user: IBasicUserInfo[];
  create_time: number;
  update_time: number;
};
/**
 * @description 文章评论信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicArticleCommentInfo {
  _id: string;
  from: IBasicUserInfo;
  article: IBasicArticleInfo;
  content_plain: string;
  content_image: string[];
  replys: IBasicArticleReplyInfo[];
  create_time: number;
  update_time: number;
};
/**
 * @description 文章评论下的回复信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicArticleReplyInfo {
  _id: string;
  from: IBasicUserInfo;
  to: IBasicUserInfo;
  comment: IBasicArticleCommentInfo;
  article: IBasicArticleInfo;
  content_plain: string;
  content_image: string[];
  create_time: number;
  update_time: number;
};

/* ---------------------------------------------- */

/**
 * @description 话题信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTopicInfo {
  _id: string;
  name: string;
  description: string;
  cover_img: string;
  pins: IBasicPinInfo[];
  followers: IBasicUserInfo[];
  actors: IBasicUserInfo[];
  create_time: number;
  update_time: number;
};

/* ---------------------------------------------- */

/**
 * @description 聊天消息基本类型接口
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export type IBasicChatMessgaeType = 'plain' | 'image' | 'file' | 'code';

/**
 * @description 聊天历史信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicChatMemoryInfo {
  _id: string;
  chat_type: 'single' | 'group';
  chat_id: string;
  chat_name: string;
  chat_avatar: string;
  last_message_content: string;
  // * 最新的聊天内容类型
  last_message_content_type: IBasicChatMessgaeType;
  // * 最新的发言人名称
  last_message_member_name: string;
  // * 未读消息总数
  unread_message_total: number;
};

/**
 * @description 单聊的基本信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicChatSingleInfo {
  _id: string;
  chat_id: string;
  from_member_id: IBasicChatSingleMemberInfo;
  to_member_id: IBasicChatSingleMemberInfo;
  message: IBasicChatSingleMessageInfo[];
  message_total: number;
  last_message_time: number;
  create_time: number;
  update_time: number;
};

/**
 * @description 单聊用户的基本信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicChatSingleMemberInfo {
  _id: string;
  chat_id: IBasicChatSingleInfo;
  user_id: IBasicUserInfo;
  create_message: IBasicChatSingleMessageInfo[];
  create_message_total: number;
  last_create_message_time: number;
  create_time: number;
};

/**
 * @description 单聊消息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicChatSingleMessageInfo {
  _id: string;
  chat_id: IBasicChatSingleInfo;
  from_member_id: IBasicChatSingleMemberInfo;
  to_member_id: IBasicChatSingleMemberInfo;
  content_type: string;
  content: string;
  create_time: number;
  update_time: number;
};


/* ----------------------------------------------- */


/**
 * @description 群聊成员权限
 * @summary 0: 群主、1: 管理员、2: 吃瓜群众
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/19
 */
export type IBasicChatGroupMemberAuthorityType = 0 | 1 | 2;

/**
 * @description 群聊消息类型
 * @summary 0: images、1: files、2: plain、3: code
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/19
 */
export type IBasicChatGroupMessageContentType = 0 | 1 | 2;

/**
 * @description 群聊基本接口
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/19
 */
export interface IBasicChatGroupInfo {
  _id: string;
  owner: IBasicChatGroupMemberInfo;
  admins: IBasicChatGroupMemberInfo[];
  name: string;
  name_update_time: number;
  description: string;
  description_update_time: number;
  avatar: string;
  avatar_update_time: number;
  create_time: number,
  members: IBasicChatGroupMemberInfo[];
  messages: IBasicChatGroupMessageInfo[];
  member_total: number;
  message_total: number;
  last_create_message_time: number;
};

/**
 * @description 群聊成员基本接口
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/19
 */
export interface IBasicChatGroupMemberInfo {
  _id: string;
  user_id: IBasicUserInfo;
  group_id: string;
  authority: IBasicChatGroupMemberAuthorityType;
  join_time: number;
  create_message: IBasicChatGroupMessageInfo[];
  create_message_total: number;
  last_create_message_time: number;
  create_time: number;
};

/**
 * @description 群聊消息基本接口
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/19
 */
export interface IBasicChatGroupMessageInfo {
  _id: string;
  group_id: IBasicChatGroupInfo;
  from_member_id: IBasicChatGroupMemberInfo;
  content_type: IBasicChatGroupMessageContentType;
  content: string;
  create_time: number;
  update_time: number;
};


/* ---------------------------------------------- */

/**
 * @description 基本的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicNotificationInfo {
  [key: string]: any;
};

/**
 * @description 用户申请加好友的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicNotificationUserFriendRequestInfo {
  _id: string;
  type: string;
  agree_state: 0 | 1 | -1;
  from: string;
  to: string;
  description: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户同意加好友的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicNotificationUserFriendAgreeInfo {
  _id: string;
  type: string;
  from: string;
  to: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户拒绝加好友的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicNotificationUserFriendRefuseInfo {
  _id: string;
  type: string;
  from: string;
  to: string;
  description: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户点赞文章的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicNotificationUserStarArticleInfo {
  _id: string;
  type: string;
  from: string;
  article: string;
  article_author: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户点赞沸点的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicNotificationUserStarPinInfo {
  _id: string;
  type: string;
  from: string;
  pin: string;
  pin_author: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户关注其他用户的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicNotificationUserAttentionPeopleInfo {
  _id: string;
  type: string;
  from: string;
  to: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户被邀请加入群聊的通知信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export interface IBasicNotificationUserChatGroupInviteInfo {
  _id: string;
  type: string;
  from: IBasicUserInfo;
  to: IBasicUserInfo;
  group: IBasicChatGroupInfo;
  create_time: number;
  update_time: number;
};

/* ---------------------------------------------- */

/**
 * @description 基本的好友动态信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicActivityInfo {
  [key: string]: any;
};

/* ---------------------------------------------- */

/**
 * @description 基本的足迹信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTrackInfo {
  [key: string]: any;
};

/**
 * @description 用户点赞文章的足迹
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTrackStarArticleInfo {
  _id: string;
  type: string;
  article: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户点赞沸点的足迹
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTrackStarPinInfo {
  _id: string;
  type: string;
  pin: string;
  pin_author: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户关注话题的足迹
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTrackAttentionTopicInfo {
  _id: string;
  type: string;
  topic: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户关注其他用户的足迹
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTrackAttentionPeopleInfo {
  _id: string;
  type: string;
  user: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户发表文章的足迹
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTrackCreateArticleInfo {
  _id: string;
  type: string;
  article: string;
  create_time: number;
  update_time: number;
};

/**
 * @description 用户发表沸点的足迹
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicTrackCreatePinInfo {
  _id: string;
  type: string;
  pin: string;
  create_time: number;
  update_time: number;
};

/* ---------------------------------------------- */

/**
 * @description 基本的沸点信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicPinInfo {
  _id: string;
  author_id: IBasicUserInfo;
  topic_id: IBasicTopicInfo;
  content_plain: string;
  content_image: Array<{
    processedUrl: string,
    originUrl: string,
  }>;
  content_link: string;
  comments: IBasicPinCommentInfo[];
  create_time: number;
  update_time: number;
};

/**
 * @description 基本的沸点评论信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicPinCommentInfo {
  _id: string;
  pin_id: IBasicPinInfo;
  from: IBasicUserInfo;
  content_plain: string;
  content_image: string;
  replys: IBasicPinReplyInfo[];
  create_time: number;
  update_time: number;
};

/**
 * @description 基本的沸点回复信息
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/15
 */
export interface IBasicPinReplyInfo {
  _id: string;
  pin_id: IBasicPinInfo;
  comment_id: IBasicPinCommentInfo;
  from: IBasicUserInfo;
  to: IBasicUserInfo;
  content_plain: string;
  content_image: string;
  create_time: number;
  update_time: number;
};