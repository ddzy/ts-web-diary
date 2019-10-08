/**
 * 用户的个人基本信息接口
 */
interface IStaticUserInfo {
  _id: string;
  username: string;
  usergender: string;
  useravatar: string;
  profile_cover_img: string;
  address: string;
  website: string;
  introduction: string;
  job: string;
  education: string;
};

export interface IBaseCommonUserInfo extends IStaticUserInfo {
};


/**
 * [收藏] 收藏文章的基本信息接口
 */
interface IStaticCollectionArticleInfo {
  _id: string;
  name: string;
};
export interface IBaseCommonCollectionArticleInfo extends IStaticCollectionArticleInfo {

};


/**
 * [话题] 话题的基本信息接口
 */
export interface IStaticTopicInfo {
  _id: string;
  cover_img: string;
  name: string;
  description: string;
  pins: string[];
  followers: string[];
  actors: IStaticUserInfo[];
  create_time: number;
  update_time: number;
};


/**
 * [文章] - 文章的基本信息接口
 */
export interface IStaticArticleInfo {
  _id: string;
  author: IStaticUserInfo;
  comments: string[];
  cover_img: string;
  mode: string;
  type: string;
  title: string;
  description: string;
  content: string;
  tag: string;
  watched_user: string[];
  create_time: number;
  update_time: number;
};

export interface IBaseCommonArticleInfo extends IStaticArticleInfo {

};


/**
 * [沸点] - 沸点的基本信息接口
 */
export interface IStaticPinInfo {
  _id: string;
  content_plain: string;
};


/**
 * [用户的足迹] 关注用户的足迹基本接口
 */
interface IStaticTrackAttentionPeopleInfo {
  _id: string;
  type: string;
  user: IStaticUserInfo;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonTrackAttentionPeopleInfo extends IStaticTrackAttentionPeopleInfo { };


/**
 * [用户的足迹] 关注话题的足迹接口
 */
interface IStaticTrackAttentionTopicInfo {
  _id: string;
  type: string;
  topic: IStaticTopicInfo;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonTrackAttentionTopicInfo extends IStaticTrackAttentionTopicInfo { };


/**
 * [用户的足迹] 点赞文章的足迹接口
 */
interface IStaticTrackStarArticleInfo {
  _id: string;
  type: string;
  article: IStaticArticleInfo;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonTrackStarArticleInfo extends IStaticTrackStarArticleInfo {

};


/**
 * [用户的足迹] 点赞沸点的足迹接口
 */
interface IStaticTrackStarPinInfo {
  _id: string;
  type: string;
  pin: IStaticPinInfo;
  pin_author: IStaticUserInfo;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonTrackStarPinInfo extends IStaticTrackStarPinInfo {

};


/**
 * [用户的足迹] 发表新文章的足迹接口
 */
interface IStaticTrackCreateArticleInfo {
  _id: string;
  type: string;
  article: IStaticArticleInfo;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonTrackCreateArticleInfo extends IStaticTrackCreateArticleInfo { };


/**
 * [用户的足迹] 发表新沸点的足迹接口
 */
interface IStaticTrackCreatePinInfo {
  _id: string;
  type: string;
  pin: IStaticPinInfo;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonTrackCreatePinInfo extends IStaticTrackCreatePinInfo { };


/**
 * [用户的足迹] 收藏文章的足迹接口
 */
interface IStaticTrackCollectionArticleInfo {
  _id: string;
  type: string;
  article: IStaticArticleInfo;
  article_author: IStaticUserInfo;
  collection: IStaticCollectionArticleInfo;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonTrackCollectionArticleInfo extends IStaticTrackCollectionArticleInfo {

};