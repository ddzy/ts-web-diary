/**
 * 用户基本信息接口
 */
export interface IBaseCommonUserInfo {
  _id: string;
  username: string;
  useravatar: string;
};

/**
 * 话题基本信息接口
 */
export interface IBaseCommonTopicInfo {
  _id: string;
  name: string;
  cover_img: string;
  pins: string[];
  followers: string[];
  create_time: number;
  update_time: number;
};

/**
 * 沸点基本信息接口
 */
export interface IBaseCommonPinInfo {
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

/**
 * 沸点评论基本接口
 */
export interface IBaseCommonPinCommentInfo {
  _id: string;
  pin_id: IBaseCommonPinInfo;
  from_user_id: IBaseCommonUserInfo;
  content_plain: string;
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>;
  replys: IBaseCommonPinReplyInfo[];
  create_time: number;
  update_time: number;
};

/**
 * 沸点回复基本接口
 */
export interface IBaseCommonPinReplyInfo {
  _id: string;
  comment_id: IBaseCommonPinCommentInfo;
  from_user_id: IBaseCommonUserInfo;
  to_user_id: IBaseCommonUserInfo;
  content_plain: string;
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>;
  create_time: number;
  update_time: number;
};