/**
 * 用户基本信息接口
 */
export interface IStaticUserInfo {
  _id: string;
  username: string;
  useravatar: string;
  introduction: string;
  job: string;
  website: string;
};

export interface ICommonBaseUserInfo {

};


/**
 * 话题基本信息接口
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

export interface IBaseCommonTopicInfo extends IStaticTopicInfo {
  is_attention: boolean;
};

/**
 * 沸点基本信息接口
 */
export interface IStaticPinInfo {
  _id: string;
  author_id: IStaticUserInfo;
  topic_id: IStaticTopicInfo;
  content_plain: string;
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>;
  content_link: {
    title: string,
    domain: string,
    coverImgUrl: string,
  };
  comments: [];
  create_time: number;
  update_time: number;
};

export interface IBaseCommonPinInfo extends IStaticPinInfo {
  user_is_friend: boolean,
  user_is_current_author: boolean,
  user_is_attention: boolean,
  comment_total: number,
};


/**
 * 沸点评论基本接口
 */
export interface IStaticPinCommentInfo {
  _id: string;
  pin_id: IBaseCommonPinInfo;
  from: IStaticUserInfo;
  content_plain: string;
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>;
  replys: IStaticPinReplyInfo[];
  create_time: number;
  update_time: number;
};

export interface IBaseCommonPinCommentInfo extends IStaticPinCommentInfo {

};


/**
 * 沸点回复基本接口
 */
export interface IStaticPinReplyInfo {
  _id: string;
  pin_id: string;
  comment_id: IStaticPinCommentInfo;
  from: IStaticUserInfo;
  to: IStaticUserInfo;
  content_plain: string;
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>;
  create_time: number;
  update_time: number;
};

export interface IBaseCommonPinReplyInfo extends IStaticPinReplyInfo {

};