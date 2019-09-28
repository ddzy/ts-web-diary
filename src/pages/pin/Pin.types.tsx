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
export interface IBaseCommonUserInfo extends IStaticUserInfo {

};


/**
 * 话题基本信息接口
 */
export interface IStaticTopicInfo {
  _id: string;
  name: string;
};
export interface IBaseCommonTopicInfo extends IStaticTopicInfo {
};


/**
 * 沸点基本信息接口
 */
export interface IStaticPinInfo {
  _id: string;
  author_id: IBaseCommonUserInfo;
  topic_id: IBaseCommonTopicInfo;
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
  from: IBaseCommonUserInfo;
  content_plain: string;
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>;
  replys: IBaseCommonPinReplyInfo[];
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
  comment_id: IBaseCommonPinCommentInfo;
  from: IBaseCommonUserInfo;
  to: IBaseCommonUserInfo;
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