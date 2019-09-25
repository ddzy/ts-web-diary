export interface ICommonBaseUserInfo {
  _id: string,
  username: string,
  useravatar: string,
  introduction: string,
  website: string,
  job: string,
};

/**
 * 沸点列表信息的公共接口
 */
export interface ICommonBasePinItemInfo {
  _id: string,
  author_id: ICommonBaseUserInfo,
  topic_id: {
    _id: string,
    name: string,
  },
  content_plain: string,
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>,
  content_link: {
    title: string,
    domain: string,
    coverImgUrl: string,
  },
  create_time: number,
  update_time: number,
  user_is_attention: boolean,
  user_is_current_author: boolean,
  user_is_friend: boolean,
};

/**
 * 沸点评论基本信息
 */
export interface ICommonBasePinCommentInfo {
  _id: string;
  pin_id: ICommonBasePinItemInfo;
  from: ICommonBaseUserInfo;
  content_plain: string;
  content_image: string[];
  replys: any[];
  create_time: number;
  update_time: number;
};

/**
 * 沸点回复基本信息
 */
export interface ICommonBasePinReplyInfo {
  _id: string;
  comment_id: ICommonBasePinCommentInfo;
  from: ICommonBaseUserInfo;
  to: ICommonBaseUserInfo;
  content_plain: string;
  content_image: string[];
  create_time: number;
  update_time: number;
};