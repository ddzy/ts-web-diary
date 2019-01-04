import { query } from "src/services/request";


// ** ServiceState Types Defines **
export interface IServiceState {
  articleInfo: IStaticArticleInfoOptions;
};
export interface IStaticArticleInfoOptions {
  author: string,
  articleContent: string,
  articleTitle: string,
  articleCount: number,
  authorAvatar: string,
  create_time: number | string,
  mode: string,
  newArticle: IStaticArticleInfoNewArticleOptions[],
  tag: string,
  type: string,
  watchCount: number,
  img: string,
  isLiked: boolean,
  comments: IStaticArticleInfoCommentsOptions[],
};
export interface IStaticArticleInfoNewArticleOptions {
  title: string;
  _id: string;
};
export interface IStaticArticleInfoCommentsOptions {
  article: string;
  create_time: number | string;
  from: {
    username: string,
    _id: string,
    useravatar: string,
  };
  replys: IStaticArticleInfoCommentsReplysOptions[];
  value: string;
  _id: string;
};
export interface IStaticArticleInfoCommentsReplysOptions {
  article: string;
  comment: string;
  create_time: number | string;
  from: {
    username: string,
    useravatar: string,
    _id: string,
  };
  to: {
    _id: string,
    username: string,
    useravatar: string,
  };
  value: string;
  _id: string;
};


// ** Commen Types Defines **
export interface IStaticCollectionItem {
  name: string;
  _id: string;
};


// ** Service Handle Types Defines **
interface IGetOneArticleInfoParams {
  articleId: string;
};
interface IGetOneArticleReturns {
  code: 0;
  message: string;
  info: IServiceState;
}

export interface ISendCommentParams {
  value: string;
  articleId: string;
  from: string;
};
export interface ISendCommentReturns {
  code: number;
  message: string;
  info: {
    commentInfo: IStaticArticleInfoCommentsOptions,
  };
};

export interface ISendReplyParams {
  commentId: string;
  value: string;
  from: string;
  to: string;
  articleId: string;
};
export interface ISendReplyReturns {
  code: number;
  message: string;
  info: {
    replyInfo: IStaticArticleInfoCommentsReplysOptions,
  };
};

export interface IFixedControlBarStarParams {
  articleId: string;
  liked: boolean;
};
export interface IFixedControlBarStarReturns {
  code: number;
  message: string;
  info: {
    starInfo: {
      isLiked: boolean;
    },
  };
};

export interface ICreateCollectionParams {
  collectionName: string;
};
export interface ICreateCollectionReturns {
  code: number;
  message: string;
  info: {
    collectionInfo: IStaticCollectionItem,
  };
};

interface ISaveToCollectionParams {
  collectionId: string;
  articleId: string;
};
interface ISaveToCollectionReturns {
  code: number;
  message: string;
  info: {
    collectionInfo: IStaticCollectionItem,
  };
};

interface IGetCollectionListParams {
  userId?: string;
};
interface IGetCollectionListReturns {
  code: number;
  message: string;
  info: {
    collectionInfo: IStaticCollectionItem[],
  };
};

interface IGetCommentUserInfoParams {
  isReply: boolean;
  commentId: string;
};
interface IGetCommentUserInfoReturns {
  code: number;
  message: string;
  info: {
    userInfo: any,
  };
};




/**
 * 获取文章数据
 * @param articleid 文章id
 * @param callback 回调函数
 */
export function serviceHandleGetOneArticleInfo(
  payload: IGetOneArticleInfoParams,
  callback: (res: IGetOneArticleReturns) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details',
    data: {
      articleid: payload.articleId,
      userid: localStorage.getItem('userid'),
    },
    jsonp: false,
  }).then((res) => {
    callback(res);
  });
}


/**
 * 发表评论
 * @param articleid 文章id
 * @param commentValue 评论内容
 * @param callback 回调函数
 */
export function serviceHandleSendComment(
  v: ISendCommentParams,
  callback?: (res: ISendCommentReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/comment',
    jsonp: false,
    data: {
      userId: localStorage.getItem('userid') || '',
      ...v,
    },
  })
    .then((res) => {
      callback && callback(res);
    });
}


/**
 * 发表回复
 * @param v 回复相关信息
 * @param callback 回调函数
 */
export function serviceHandleSendReply(
  v: ISendReplyParams,
  callback?: (res: ISendReplyReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/reply',
    jsonp: false,
    data: {
      ...v,
      userId: localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 => 点赞文章
 * @param articleid 文章id
 * @param liked 点赞or取消
 * @param callback 回调函数
 */
export function serviceHandleFixedControlBarStar(
  payload: IFixedControlBarStarParams,
  callback?: (res: IFixedControlBarStarReturns) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details/star',
    data: {
      articleid: payload.articleId,
      liked: payload.liked,
      userid: localStorage.getItem('userid'),
    },
    jsonp: false,
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 => 创建新的收藏夹
 * @param collection 收藏夹名称
 */
export function serviceHandleCreateCollection(
  payload: ICreateCollectionParams,
  callback?: (res: ICreateCollectionReturns) => void,
): void {
  query({
    url: '/api/details/collection/create',
    method: 'GET',
    jsonp: false,
    data: {
      collection: payload.collectionName,
      userid: localStorage.getItem('userid'),
    },
  })
    .then((res) => {
      callback && callback(res);
    });
}


/**
 * 文章详情 => 确认添加至收藏夹
 * @param articleId 文章id
 * @param collectionId 收藏夹id
 */
export function serviceHandleSaveToCollection(
  payload: ISaveToCollectionParams,
  callback?: (res: ISaveToCollectionReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/collection/save',
    jsonp: false,
    data: {
      userid: localStorage.getItem('userid'),
      articleId: payload.articleId,
      collectionId: payload.collectionId,
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> 控制栏 -> 获取用户收藏夹信息
 */
export function serviceHandleGetCollectionList(
  payload: IGetCollectionListParams,
  callback?: (res: IGetCollectionListReturns) => void,
): void {
  query({
    method: 'GET',
    url: '/api/details/collection/info',
    jsonp: false,
    data: {
      userId: payload.userId
        ? payload.userId
        : localStorage.getItem('userid'),
    },
  }).then((res) => {
    callback && callback(res);
  });
}


/**
 * 文章详情 -> comment -> 头像框hover获取评论者信息
 */
export function serviceHandleGetCommentUserInfo(
  payload: IGetCommentUserInfoParams,
  callback?: (data: IGetCommentUserInfoReturns) => void,
): void {
  query({
    method: 'POST',
    url: '/api/details/comment/user/info',
    jsonp: false,
    data: {
      ...payload,
    },
  }).then((res) => {
    callback && callback(res);
  });
}
