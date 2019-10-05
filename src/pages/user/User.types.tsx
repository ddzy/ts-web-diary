/**
 * 用户的个人基本信息接口
 */
interface IStaticUserProfileInfo {
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

export interface IBaseCommonUserProfileInfo extends IStaticUserProfileInfo {
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
  actors: IStaticUserProfileInfo[];
  create_time: number;
  update_time: number;
};


/**
 * [文章] - 文章的基本信息接口
 */
export interface IStaticArticleInfo {
  _id: string;
  title: string;
};


/**
 * [用户的足迹] 关注用户的足迹基本接口
 */
interface IStaticTrackAttentionPeopleInfo {
  _id: string;
  type: string;
  user: IStaticUserProfileInfo;
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