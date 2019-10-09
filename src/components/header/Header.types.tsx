// ? 申请加好友的数据模型
export interface IBaseNoficationUserFriendRequestParams {
  _id: string;
  agree_state: -1 | 0 | 1;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  };
  to: {
    _id: string,
    username: string,
    useravatar: string,
  };
  description: string;
  create_time: number;
  update_time: number;
};

// ? 同意加好友的数据模型
export interface IBaseNotificationUserFriendAgreeParams {
  _id: string;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  },
  to: {
    _id: string,
    username: string,
    useravatar: string,
  },
  create_time: number;
  update_time: number;
};

// ? 拒绝加好友的数据模型
export interface IBaseNotificationUserFriendRefuseParams {
  _id: string;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  };
  to: {
    _id: string,
    username: string,
    useravatar: string,
  };
  description: string;
  create_time: number;
  update_time: number;
};

// ? 用户点赞我的文章的通知模型
export interface IBaseNotificationUserStarArticleParams {
  _id: string;
  type: string;
  from: {
    _id: string,
    username: string,
  };
  article: {
    _id: string,
    title: string,
  };
  article_author: {
    _id: string,
    username: string,
  };
  create_time: number;
  update_time: number;
};

// ? 用户关注我的通知模型
export interface IBaseNotificationUserAttentionPeopleParams {
  _id: string;
  type: string;
  to: {
    _id: string,
    username: string,
  };
  from: {
    _id: string,
    username: string,
  };
  create_time: number;
  update_time: number;
};

// ? 用户点赞我的沸点的通知模型
export interface IBaseNotificationUserStarPinParams {
  _id: string;
  type: string;
  from: {
    _id: string,
    username: string,
  };
  pin: {
    _id: string,
  };
  pin_author: {
    _id: string,
    username: string,
  };
  create_time: number;
  update_time: number;
};

// ? 用户收藏我的文章的通知模型
export interface IBaseNotificationUserCollectionArticleParams {
  _id: string;
  type: string;
  from: {
    _id: string,
    username: string,
  };
  collection: {
    _id: string,
    name: string,
  };
  article: {
    _id: string,
    title: string,
  };
  article_author: {
    _id: string,
    username: string,
  };
  create_time: number;
  update_time: number;
};